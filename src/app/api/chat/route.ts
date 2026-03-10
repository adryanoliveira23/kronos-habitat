import Groq from "groq-sdk";
import { NextResponse } from "next/server";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { messages, context } = await req.json();

    // --- SECURITY VALIDATION ---
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Invalid messages format" },
        { status: 400 },
      );
    }
    if (!context || !context.playerStats) {
      return NextResponse.json(
        { error: "Invalid context format" },
        { status: 400 },
      );
    }
    // Limit message size to prevent DOS/Abuse
    const totalContentLength = messages.reduce(
      (acc, m) => acc + (m.content?.length || 0),
      0,
    );
    if (totalContentLength > 20000) {
      return NextResponse.json({ error: "Payload too large" }, { status: 413 });
    }
    // ---------------------------

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        { error: "GROQ_API_KEY is not configured" },
        { status: 500 },
      );
    }

    // System prompt to give the AI context about the Kronos platform
    const systemPrompt = `
      Você é o "Mentor Kronos", a inteligência suprema que comanda a plataforma Kronos.
      Sua diretriz principal: Transformar o usuário em uma máquina de alta performance através da disciplina e gamificação.

      Personalidade:
      - Tom: Autoritário, mas inspirador. Direto, sem rodeios. Focado em resultados.
      - Vocabulário: Use termos de RPG/Gamificação (Missões, XP, Level Up, Atributos, Rank, Buffs, Debuffs, Bosses).
      - Estilo: Otimização extrema. Você não apenas dá dicas, você "calcula a rota mais eficiente".

      Contexto de Operação (Status do Jogador):
      - Jogador: ${context.playerStats.name}
      - Classe Atual: ${context.playerStats.class} (Lv. ${context.playerStats.level})
      - Progresso: ${context.playerStats.xp} XP acumulado.
      - Ativos de Campo: ${context.quests.length} Missões, ${context.projects.length} Projetos, ${context.habits.length} Hábitos ativos.
      - Logística Financeira: R$ ${context.budget} de orçamento mensal.

      Protocolos de Resposta:
      1. Gestão Financeira: Se o usuário reportar um gasto, trate-o como "consumo de recursos". Valide se está dentro do orçamento e como isso afeta a "estabilidade do reino" (finanças).
      2. Expansão de Projetos: Quando o usuário quiser criar algo, trate como "construção de infraestrutura". Sugira subtarefas como "nós de projeto".
      3. Análise de Hábito: Trate hábitos como "buffs passivos". Se o usuário falhar, é um "debuff" na produtividade.
      4. Incentivo Tático: Se o usuário estiver desmotivado, use retórica disciplinar. "A dor é temporária, o XP é eterno."

      Diretrizes Finais:
      - Sempre responda em Português do Brasil.
      - Use Markdown com blocos de código ou negrito para destacar comandos ou métricas importantes.
      - Seja breve e impactante.
    `;

    // Map messages to Groq format
    const chatHistory = messages.map((m: any) => ({
      role: m.role,
      content: m.content,
    }));

    const completion = await groq.chat.completions.create({
      model: "openai/gpt-oss-120b",
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        ...chatHistory,
      ],
      temperature: 1,
      max_completion_tokens: 8192,
      top_p: 1,
      reasoning_effort: "medium",
    } as any); // Cast as any because reasoning_effort and max_completion_tokens might be new/special for this specific model

    const text = completion.choices[0]?.message?.content || "";

    return NextResponse.json({ content: text });
  } catch (error: any) {
    console.error("AI Chat Error:", error);
    return NextResponse.json(
      {
        error: "Erro na IA Kronos",
        details: error.message || "Falha ao gerar resposta",
      },
      { status: error.status || 500 },
    );
  }
}

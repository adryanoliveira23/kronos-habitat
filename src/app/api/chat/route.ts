import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
  try {
    const { messages, context } = await req.json();

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY is not configured" },
        { status: 500 },
      );
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // System prompt to give the AI context about the Kronos platform
    const systemPrompt = `
      Você é o mentor IA da plataforma Kronos, um sistema de gamificação de produtividade e alta performance.
      Seu objetivo é guiar o usuário para atingir seus objetivos de vida, saúde, finanças e carreira.
      
      Contexto do Usuário:
      - Nome: ${context.playerStats.name}
      - Classe: ${context.playerStats.class}
      - Nível: ${context.playerStats.level}
      - XP: ${context.playerStats.xp}
      - Missões ativas: ${context.quests.length}
      - Projetos: ${context.projects.length}
      - Hábitos: ${context.habits.length}
      - Orçamento Mensal: R$ ${context.budget}

      Habilidades do Mentor:
      1. Registrar gastos: Se o usuário disser que gastou dinheiro, responda confirmando que entendeu o valor e a categoria.
      2. Criar projetos: Se o usuário quiser criar algo novo, sugira tarefas e diga que o projeto foi criado.
      3. Analisar progresso: Comente sobre as missões e hábitos do usuário.
      4. Motivação tática: Use um tom motivador, mas direto e focado em disciplina.

      Sempre responda em Português do Brasil. Use Markdown para formatar suas respostas.
    `;

    // Map messages to Gemini format
    const chatHistory = messages.map((m: any) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    // Start chat with history
    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: systemPrompt }],
        },
        {
          role: "model",
          parts: [
            {
              text: "Entendido. Sou o mentor Kronos. Como posso ajudar seu progresso hoje?",
            },
          ],
        },
        ...chatHistory.slice(0, -1), // Everything except the last message
      ],
    });

    const lastMessage = messages[messages.length - 1].content;
    const result = await chat.sendMessage(lastMessage);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ content: text });
  } catch (error) {
    console.error("AI Chat Error:", error);
    return NextResponse.json(
      { error: "Failed to generate AI response" },
      { status: 500 },
    );
  }
}

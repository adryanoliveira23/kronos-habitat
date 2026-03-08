const privateKey =
  "-----BEGIN PRIVATE KEY-----\\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDW98O8ZDnzW3AF\\nGWZ1odp77bj/Q0pnYRFQNsIwojQnGCQcBQ2OMvRTHb6XPf5S4h4wQ4DZEkjfqNFK\\npfDhe1Kd66CkXaAMQfeXCUsY9EGjCsYp+2tkMRhKMfJkDLmdN6bo+hGW3/v0V2sw\\n2a4d2weiXjS/obZbRQT2jVWbPd1LqMHWBkIcZm/U8ZviAlzUTzJdAqQwCOneu4B5\\ns4RLybW2hCq/IKFFDdnyggqFevz6rc7B+E7mskyLl+M9sS806MsWTl53SdbNR1bk\\nbGmNRziykGTR4814nnRXQXIzIj+5yv3mCyLt94BNNjVsKFTn1KouSD6ebYaEjXBx\\nSI74JfvVAgMBAAECggEADGuLRRa7XGqjib/ichh0YaWmAyWVpmxuziYjySCOB9Y2\\nu+G020rpX+X/jYh46bwDx4EW8DPEvxtnYDs/NB/mcZZcFTMNnLexAOp6CsqOAkgM\\nk/9hQIwvnZXOLeaoUMOW4q4UFxYA3iiw2kUxcKsngUOVI59JxHMz6rTWxd3oq8bM\\noSntcaditB5c3YfZ2s4tbB5+CAlmpuCsSCFd7Aipcd3aFjOPNtsglIJiQXn2xBob\\nDGjIxBDVZfomWHTx1/hBUcoc9mivpqqBKqaIMGZIjU/vD14KWZ5bpQ45yQIbGsqx\\btNBgFYCUxK21i1WZ29DbVIciHTYFkV+WhkBS+jA0QKBgQD81DHlT9+yK4AIsG+u\\nsBa2rT4e8Fo2v/OaFPLxm1/cDWEEddUgBUDFsJNNntBfY2FCujImVsopZ8o/BcZ/\\nIUeF3cg8bd+GG4i8RNKt0SVpE8D80CQtjkiQ6DCEOsLj+Fz4Fijw9RlPcopwRElX\\n8dWNMyZt2oeUSNU7Y711GuyeOQKBgQDZqgCJlYnK+wJK02nRjs2uEZpj4cdUjP6m\\n9MhG3235zoE650CozlSsKjRSsoZ/BwfqAVzP+KA0QfQWxiVIviHXqHReYD+dxzMj\\nhThAqHW3cZ1icUvDOukwlMRFrTL3On8lc55t5qWOynE6KOg+ucedqxS1lPx0+wM+\\nlF1WT+KKfQKBgQDH42QHblznWmkBdaz2qZVrnBBvGYvZmW0ZNtLUngjty04W3qo/\\nhKevJGlxhswrfkDZJqibkyaGEd7ecMx8mm0Xsz6qOBvuxToXzznZ3m77YnjD6DOS\\nKNnKZyhkgqiu4B9wrOR1jPIT0/ULyZFLDJHP7s7FL27dl6+uIq8ZNM46UQKBgQDY\\nzPC+GZlm+T9eQlerKB8L23K5PACr4cgfib8WgKNs51hm0EHiIanK1jrJiBJY4irq\\n1LKaX51Kj8rNCE3It8DDqoFGI34Z7HiuT5opJOIjduH5VLnO2pW8EuGwOQSDpdtQ\\n9Wl/M/YBVPkUofw5xhfinq4A80XGSuL/aQ3S07zkjQKBgCpruaJ/YhjQ4YKBXR1A\\nuAaebENL44wm29kCaJAIxrG/uMsL2BOdAGYE1E6qQ1jW/IqJTt9CedP3gRKybBwe\\nHao1U9lmoZDzKoJ1uHuF2fYdNyxMpQgeiieLRnqLYVQqcbi2socl7WIsbDXXlhAm\\nnKc8OXRUhb9esZIt3BjBc7yn\\n-----END PRIVATE KEY-----";

const cleanedKey = privateKey.replace(/\\n/g, "\n");

try {
  const crypto = require("crypto");
  crypto.createPrivateKey(cleanedKey);
  console.log("SUCCESS: Cleaned key is valid PEM");
} catch (e) {
  console.log("FAILURE:", e.message);
}

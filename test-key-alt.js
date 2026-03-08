const privateKey = `-----BEGIN PRIVATE KEY-----
MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDW98O8ZDnzW3AF
GWZ1odp77bj/Q0pnYRFQNsIwojQnGCQcBQ2OMvRTHb6XPf5S4h4wQ4DZEkjfqNFK
pfDhe1Kd66CkXaAMQfeXCUsY9EGjCsYp+2tkMRhKMfJkDLmdN6bo+hGW3/v0V2sw
2a4d2weiXjS/obZbRQT2jVWbPd1LqMHWBkIcZm/U8ZviAlzUTzJdAqQwCOneu4B5
s4RLybW2hCq/IKFFDdnyggqFevz6rc7B+E7mskyLl+M9sS806MsWTl53SdbNR1bk
bGmNRziykGTR4814nnRXQXIzIj+5yv3mCyLt94BNNjVsKFTn1KouSD6ebYaEjXBx
SI74JfvVAgMBAAECggEADGuLRRa7XGqjib/ichh0YaWmAyWVpmxuziYjySCOB9Y2
u+G020rpX+X/jYh46bwDx4EW8DPEvxtnYDs/NB/mcZZcFTMNnLexAOp6CsqOAkgM
k/9hQIwvnZXOLeaoUMOW4q4UFxYA3iiw2kUxcKsngUOVI59JxHMz6rTWxd3oq8bM
oSntcaditB5c3YfZ2s4tbB5+CAlmpuCsSCFd7Aipcd3aFjOPNtsglIJiQXn2xBob
DGjIxBDVZfomWHTx1/hBUcoc9mivpqqBKqaIMGZIjU/vD14KWZ5bpQ45yQIbGsqx
btNBgFYCUxK21i1WZ29DbVIciHTYFkV+WhkBS+jA0QKBgQD81DHlT9+yK4AIsG+u
sBa2rT4e8Fo2v/OaFPLxm1/cDWEEddUgBUDFsJNNntBfY2FCujImVsopZ8o/BcZ/
IUeF3cg8bd+GG4i8RNKt0SVpE8D80CQtjkiQ6DCEOsLj+Fz4Fijw9RlPcopwRElX
8dWNMyZt2oeUSNU7Y711GuyeOQKBgQDZqgCJlYnK+wJK02nRjs2uEZpj4cdUjP6m
9MhG3235zoE650CozlSsKjRSsoZ/BwfqAVzP+KA0QfQWxiVIviHXqHReYD+dxzMj
hThAqHW3cZ1icUvDOukwlMRFrTL3On8lc55t5qWOynE6KOg+ucedqxS1lPx0+wM+
lF1WT+KKfQKBgQDH42QHblznWmkBdaz2qZVrnBBvGYvZmW0ZNtLUngjty04W3qo/
hKevJGlxhswrfkDZJqibkyaGEd7ecMx8mm0Xsz6qOBvuxToXzznZ3m77YnjD6DOS
KNnKZyhkgqiu4B9wrOR1jPIT0/ULyZFLDJHP7s7FL27dl6+uIq8ZNM46UQKBgQDY
zPC+GZlm+T9eQlerKB8L23K5PACr4cgfib8WgKNs51hm0EHiIanK1jrJiBJY4irq
1LKaX51Kj8rNCE3It8DDqoFGI34Z7HiuT5opJOIjduH5VLnO2pW8EuGwOQSDpdtQ
9Wl/M/YBVPkUofw5xhfinq4A80XGSuL/aQ3S07zkjQKBgCpruaJ/YhjQ4YKBXR1A
uAaebENL44wm29kCaJAIxrG/uMsL2BOdAGYE1E6qQ1jW/IqJTt9CedP3gRKybBwe
Hao1U9lmoZDzKoJ1uHuF2fYdNyxMpQgeiieLRnqLYVQqcbi2socl7WIsbDXXlhAm
nnKc8OXRUhb9esZIt3BjBc7yn
-----END PRIVATE KEY-----`;

try {
  const crypto = require("crypto");
  // Attempt to load as PKCS#8 or PKCS#1
  crypto.createSecretKey(Buffer.from(privateKey, "utf-8"));
  console.log("SUCCESS: Multi-line string loaded as secret key");
} catch (e) {
  console.log("FAILURE SecretKey:", e.message);
}

try {
  const crypto = require("crypto");
  const forge = require("node-forge"); // Not likely available, but checking patterns
} catch (e) {}

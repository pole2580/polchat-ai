"use client"

import { useEffect } from "react"

export default function SimpleChat() {
  useEffect(() => {
    // Function to detect language
    function detectLanguage(text) {
      // Simple language detection based on common words
      const langPatterns = {
        en: /\b(the|is|are|what|how|why|when|who|where|can|hello|hi|thanks|you|for|this|that)\b/i,
        sw: /\b(na|ni|kwa|je|vipi|nini|lini|nani|wapi|habari|asante|wewe|mimi|hii|hiyo|sasa|tafadhali)\b/i,
        fr: /\b(le|la|les|est|sont|que|comment|pourquoi|quand|qui|où|bonjour|salut|merci|vous|pour|ce|cette)\b/i,
        es: /\b(el|la|los|las|es|son|qué|cómo|por qué|cuándo|quién|dónde|hola|gracias|usted|para|este|esta)\b/i,
      }

      // Check for matches in each language
      for (const [lang, pattern] of Object.entries(langPatterns)) {
        if (pattern.test(text)) {
          return lang
        }
      }

      // Default to Swahili if no language is detected
      return "sw"
    }

    // Function to get response based on language
    function getResponse(question, lang) {
      const responses = {
        en: [
          `Thank you for your question about "${question}". I'd like to help you further.`,
          `Based on your question about "${question}", I recommend doing more research.`,
          `Your question about "${question}" is important. The answer may vary depending on the context.`,
          `I've received your question about "${question}". This is a good topic to discuss.`,
          `Regarding "${question}", there are many different opinions. I would recommend considering various sources.`,
        ],
        sw: [
          `Asante kwa swali lako kuhusu "${question}". Ningependekeza kukusaidia zaidi.`,
          `Kulingana na swali lako "${question}", napendekeza ufanye utafiti zaidi.`,
          `Swali lako "${question}" ni muhimu. Jibu lake linaweza kuwa tofauti kulingana na mazingira.`,
          `Nimepokea swali lako kuhusu "${question}". Hii ni mada nzuri ya kujadili.`,
          `Kuhusu "${question}", kuna maoni mengi tofauti. Ningependekeza kuzingatia vyanzo mbalimbali.`,
        ],
        fr: [
          `Merci pour votre question sur "${question}". J'aimerais vous aider davantage.`,
          `Selon votre question sur "${question}", je vous recommande de faire plus de recherches.`,
          `Votre question sur "${question}" est importante. La réponse peut varier selon le contexte.`,
          `J'ai reçu votre question sur "${question}". C'est un bon sujet à discuter.`,
          `Concernant "${question}", il y a beaucoup d'opinions différentes. Je vous recommande de considérer diverses sources.`,
        ],
        es: [
          `Gracias por su pregunta sobre "${question}". Me gustaría ayudarle más.`,
          `Basado en su pregunta sobre "${question}", recomiendo hacer más investigación.`,
          `Su pregunta sobre "${question}" es importante. La respuesta puede variar según el contexto.`,
          `He recibido su pregunta sobre "${question}". Este es un buen tema para discutir.`,
          `Con respecto a "${question}", hay muchas opiniones diferentes. Recomendaría considerar varias fuentes.`,
        ],
      }

      // Get responses for the detected language or default to Swahili
      const langResponses = responses[lang] || responses.sw
      return langResponses[Math.floor(Math.random() * langResponses.length)]
    }

    // Function to get welcome message based on language
    function getWelcomeMessage(lang) {
      const welcomeMessages = {
        en: `Welcome! Ask any question about any topic.<br/><b>PolChat AI</b> will respond directly.<br/><i>Created by Pole Martini Magembe, Kigoma, Tanzania.</i>`,
        sw: `Karibu! Uliza swali lolote kuhusu mada yoyote.<br/><b>PolChat AI</b> itakujibu moja kwa moja.<br/><i>Imetengenezwa na Pole Martini Magembe, Kigoma, Tanzania.</i>`,
        fr: `Bienvenue! Posez n'importe quelle question sur n'importe quel sujet.<br/><b>PolChat AI</b> vous répondra directement.<br/><i>Créé par Pole Martini Magembe, Kigoma, Tanzanie.</i>`,
        es: `¡Bienvenido! Haga cualquier pregunta sobre cualquier tema.<br/><b>PolChat AI</b> responderá directamente.<br/><i>Creado por Pole Martini Magembe, Kigoma, Tanzania.</i>`,
      }

      return welcomeMessages[lang] || welcomeMessages.sw
    }

    // Set up the chat form submission
    const chatForm = document.getElementById("chat-form")
    const userInput = document.getElementById("user-input")
    const chatContainer = document.getElementById("chat-container")

    // Set initial welcome message in Swahili
    if (chatContainer) {
      const welcomeDiv = document.createElement("div")
      welcomeDiv.style.margin = "6px 0"
      welcomeDiv.style.padding = "8px 12px"
      welcomeDiv.style.borderRadius = "16px"
      welcomeDiv.style.maxWidth = "80%"
      welcomeDiv.style.display = "inline-block"
      welcomeDiv.style.wordBreak = "break-word"
      welcomeDiv.style.fontSize = "1rem"
      welcomeDiv.style.background = "#f1e7ff"
      welcomeDiv.style.color = "#5c398a"
      welcomeDiv.style.float = "left"
      welcomeDiv.style.clear = "both"
      welcomeDiv.innerHTML = getWelcomeMessage("sw")
      chatContainer.appendChild(welcomeDiv)
    }

    if (chatForm && userInput && chatContainer) {
      chatForm.addEventListener("submit", (e) => {
        e.preventDefault()
        const message = userInput.value.trim()
        if (!message) return

        // Detect language
        const detectedLang = detectLanguage(message)

        // Add user message
        const userMsg = document.createElement("div")
        userMsg.style.margin = "6px 0"
        userMsg.style.padding = "8px 12px"
        userMsg.style.borderRadius = "16px"
        userMsg.style.maxWidth = "80%"
        userMsg.style.display = "inline-block"
        userMsg.style.wordBreak = "break-word"
        userMsg.style.fontSize = "1rem"
        userMsg.style.background = "#d6edff"
        userMsg.style.color = "#24527a"
        userMsg.style.float = "right"
        userMsg.style.clear = "both"
        userMsg.textContent = message
        chatContainer.appendChild(userMsg)

        // Clear input
        userInput.value = ""

        // Scroll to bottom
        chatContainer.scrollTop = chatContainer.scrollHeight

        // Show typing indicator
        const typingIndicator = document.createElement("div")
        typingIndicator.style.margin = "6px 0"
        typingIndicator.style.padding = "8px 12px"
        typingIndicator.style.borderRadius = "16px"
        typingIndicator.style.maxWidth = "80%"
        typingIndicator.style.display = "inline-block"
        typingIndicator.style.wordBreak = "break-word"
        typingIndicator.style.fontSize = "1rem"
        typingIndicator.style.background = "#f1e7ff"
        typingIndicator.style.color = "#5c398a"
        typingIndicator.style.float = "left"
        typingIndicator.style.clear = "both"
        typingIndicator.innerHTML = `
          <div style="display: inline-block; position: relative; width: 50px; height: 20px;">
            <span style="height: 8px; width: 8px; float: left; margin: 0 1px; background-color: #5c398a; display: block; border-radius: 50%; opacity: 0.4; animation: 1s blink infinite 0.3333s;"></span>
            <span style="height: 8px; width: 8px; float: left; margin: 0 1px; background-color: #5c398a; display: block; border-radius: 50%; opacity: 0.4; animation: 1s blink infinite 0.6666s;"></span>
            <span style="height: 8px; width: 8px; float: left; margin: 0 1px; background-color: #5c398a; display: block; border-radius: 50%; opacity: 0.4; animation: 1s blink infinite 0.9999s;"></span>
          </div>
        `
        chatContainer.appendChild(typingIndicator)

        // Scroll to bottom
        chatContainer.scrollTop = chatContainer.scrollHeight

        // Simulate bot response
        setTimeout(() => {
          // Remove typing indicator
          chatContainer.removeChild(typingIndicator)

          // Add bot response in the same language
          const botMsg = document.createElement("div")
          botMsg.style.margin = "6px 0"
          botMsg.style.padding = "8px 12px"
          botMsg.style.borderRadius = "16px"
          botMsg.style.maxWidth = "80%"
          botMsg.style.display = "inline-block"
          botMsg.style.wordBreak = "break-word"
          botMsg.style.fontSize = "1rem"
          botMsg.style.background = "#f1e7ff"
          botMsg.style.color = "#5c398a"
          botMsg.style.float = "left"
          botMsg.style.clear = "both"
          botMsg.textContent = getResponse(message, detectedLang)
          chatContainer.appendChild(botMsg)

          // Scroll to bottom
          chatContainer.scrollTop = chatContainer.scrollHeight
        }, 1500)
      })
    }

    // Add keyframes for typing animation
    const style = document.createElement("style")
    style.textContent = `
      @keyframes blink {
        50% {
          opacity: 1;
        }
      }
    `
    document.head.appendChild(style)
  }, [])

  return (
    <div style={{ fontFamily: "Segoe UI, Arial, sans-serif", background: "#f3f7fa", minHeight: "100vh" }}>
      <header style={{ background: "#24527a", color: "white", textAlign: "center", padding: "18px 0 8px 0" }}>
        <h1 style={{ margin: "0 0 5px 0", fontSize: "1.8rem" }}>PolChat AI</h1>
        <p style={{ margin: 0, fontSize: "0.9rem" }}>Msaidizi wako wa maswali yote | Powered by ChatGPT</p>
      </header>

      <main
        style={{
          maxWidth: "600px",
          margin: "20px auto",
          background: "#fff",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          padding: "16px",
        }}
      >
        <div
          id="chat-container"
          style={{
            maxHeight: "400px",
            overflowY: "auto",
            background: "#e9f1fc",
            borderRadius: "8px",
            padding: "8px",
            marginBottom: "15px",
            minHeight: "300px",
          }}
        ></div>

        <form id="chat-form" style={{ display: "flex", gap: "8px", marginBottom: "14px" }} autoComplete="off">
          <input
            type="text"
            id="user-input"
            placeholder="Andika swali hapa... / Type your question here..."
            style={{
              flex: 1,
              padding: "10px",
              border: "1.5px solid #24527a",
              borderRadius: "7px",
              fontSize: "1rem",
              outline: "none",
            }}
            autoComplete="off"
          />
          <button
            type="submit"
            style={{
              padding: "10px 26px",
              background: "#24527a",
              color: "white",
              border: "none",
              borderRadius: "7px",
              cursor: "pointer",
              fontSize: "1rem",
            }}
          >
            Tuma / Send
          </button>
        </form>
      </main>

      <footer
        style={{ textAlign: "center", background: "#24527a", color: "#e2eaff", padding: "10px 0", marginTop: "25px" }}
      >
        <p>© 2025 Pole Martini Magembe | PolChat AI</p>
      </footer>
    </div>
  )
        }

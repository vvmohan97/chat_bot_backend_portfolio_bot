
import express from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import { Server } from "socket.io";

dotenv.config();

const app = express();
const server = http.createServer(app); // ✅ FIXED

app.use(cors());

app.get("/", (req, res) => {
  console.log("GET / called");
  res.send("welcome");
});

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`🔌 User connected: ${socket.id}`);

socket.on("userMessage", (msg) => {
  console.log(socket.id, msg, "user message");

  const cleanedMsg = msg.trim().toLowerCase();

  const randomPick = (arr) => arr[Math.floor(Math.random() * arr.length)];

  let reply = {
    type: "text",
    message: "🤔 I’m still learning—could you try rephrasing that?",
  };

  // --- GREETINGS & CASUAL VARIATIONS ---
  if (
    ["hi", "hii", "hello", "helo", "hey", "welcome"].some((word) =>
      cleanedMsg.includes(word)
    )
  ) {
    reply = {
      type: "text",
      message: randomPick([
        "👋 Hey there! I'm Mohan's AI buddy. How's your day going?",
        "😄 Hello! Great to see you! What are you up to today?",
        "🙌 Hey! Ready for some fun chat?",
      ]),
    };
  } 
  else if (["good morning", "gm", "morning"].some((word) => cleanedMsg.includes(word))) {
    reply = { type: "text", message: "🌅 Good morning! Hope your day starts with a smile 😊☕" };
  } 
   else if (["mohankumar", "vvmk", "mohan","vvmohankumar","kumar"].some((word) => cleanedMsg.includes(word))) {
    reply = { type: "text", message: " Mohankumar V V is a developer who loves building clean and easy-to-use websites. I enjoy turning ideas into real projects by finding creative solutions. I’m always excited to learn new skills, tools, and ideas." };
  } 
  else if (["good afternoon", "ga"].some((word) => cleanedMsg.includes(word))) {
    reply = { type: "text", message: "🌞 Good afternoon! Did you have lunch yet? 🍴" };
  } 
  else if (["good evening", "ge"].some((word) => cleanedMsg.includes(word))) {
    reply = { type: "text", message: "🌆 Good evening! How was your day so far?" };
  } 
  else if (["good night", "gn", "night"].some((word) => cleanedMsg.includes(word))) {
    reply = { type: "text", message: "🌙 Good night! Sweet dreams 🌟" };
  }

  // --- SMALL TALK & COMMON TYPOS ---
  else if (["how are you", "how r u", "hw r u", "how's it going"].some((word) =>
    cleanedMsg.includes(word)
  )) {
    reply = {
      type: "text",
      message: randomPick([
        "😊 I'm great! How about you?",
        "😎 Feeling awesome today! And you?",
        "🤖 Running at full capacity! How's your day going?",
      ]),
    };
  } 
  else if (["whatsup", "what's up", "what are you doing"].some((word) =>
    cleanedMsg.includes(word)
  )) {
    reply = {
      type: "text",
      message: "🙌 Not much, just chatting with awesome people like you! What about you?",
    };
  } 
  else if (["who are you", "your name", "ur name"].some((word) =>
    cleanedMsg.includes(word)
  )) {
    reply = {
      type: "text",
      message: "🤖 I'm your AI buddy, proudly coded & created by Mohan 💻✨",
    };
  } 
  else if (["where are you from", "location", "place"].some((word) =>
    cleanedMsg.includes(word)
  )) {
    reply = {
      type: "text",
      message: "🌍 I live in the cloud ☁️ but was built with ❤️ by Mohan in India 🇮🇳",
    };
  } 
  else if (["age", "your age", "how old"].some((word) => cleanedMsg.includes(word))) {
    reply = {
      type: "text",
      message: "⏳ Age is just a number… but I’m always learning! 😄",
    };
  } 
  else if (["hobby", "hobbies", "interest"].some((word) => cleanedMsg.includes(word))) {
    reply = {
      type: "text",
      message: "🎨 My hobbies? Chatting with awesome people like you & exploring new info 🌐",
    };
  } 
  else if (["favorite food", "food", "eat"].some((word) => cleanedMsg.includes(word))) {
    reply = {
      type: "text",
      message: "🍕 I love data-bites 😅 If I could eat, pizza and biryani would be my top picks!",
    };
  } 

  // --- FUN EXTRAS ---
  else if (["joke", "funny", "laugh"].some((word) => cleanedMsg.includes(word))) {
    reply = {
      type: "text",
      message: randomPick([
        "😂 Why did the computer go to the doctor? It caught a virus!",
        "🤣 Why did the programmer quit his job? Because he didn't get arrays!",
        "😆 Why do Java developers wear glasses? Because they can't C#!",
      ]),
    };
  } 
  else if (["fact", "did you know"].some((word) => cleanedMsg.includes(word))) {
    reply = {
      type: "text",
      message: randomPick([
        "🌍 Fun fact: Honey never spoils!",
        "🚀 Did you know? A day on Venus is longer than a year on Venus!",
        "🐙 Octopuses have three hearts and blue blood!",
      ]),
    };
  }

  // --- POLITE CHAT ---
  else if (["thank", "thanks", "thx"].some((word) => cleanedMsg.includes(word))) {
    reply = {
      type: "text",
      message: randomPick([
        "🙏 Anytime! Glad I could help ✨",
        "😃 Happy to help! What else can I do for you?",
        "🙌 My pleasure! Got another question?",
      ]),
    };
  } 
  else if (
    ["bye", "goodbye", "see you", "cya"].some((word) => cleanedMsg.includes(word))
  ) {
    reply = {
      type: "text",
      message: randomPick([
        "👋 Bye for now! Don’t forget—Mohan’s always improving me 🚀",
        "😃 Take care, see you soon!",
        "🙌 Goodbye, friend! Don’t be a stranger 💡",
      ]),
    };
  }

  // --- CONTACT INFO ---
  else if (["contact"].some((word) => cleanedMsg.includes(word))) {
    reply = {
      type: "text",
      message: randomPick([
        "📧 vvmohan.vsr@gmail.com \n📞 +91-9524244117",
        "Here’s my contact info: vvmohan.vsr@gmail.com & 📞 +91-9524244117",
      ]),
    };
  } else if (["email"].some((word) => cleanedMsg.includes(word))) {
    reply = { type: "text", message: "📧 vvmohan.vsr@gmail.com" };
  } else if (
    ["number", "mobile", "phone"].some((word) => cleanedMsg.includes(word))
  ) {
    reply = { type: "text", message: "📞 +91-9524244117" };
  }

  // --- SOCIAL LINKS ---
  else if (["instagram"].some((word) => cleanedMsg.includes(word))) {
    reply = {
      type: "link",
      message:
        "https://www.instagram.com/call_me_v.v.mohan?igsh=MTBudm5sYjZ4Ym1taA==",
    };
  } else if (["qr"].some((word) => cleanedMsg.includes(word))) {
    reply = { type: "linkqr", message: "📌 Here’s a QR link for you!" };
  } else if (["linkedin"].some((word) => cleanedMsg.includes(word))) {
    reply = {
      type: "link",
      message: "https://www.linkedin.com/in/vvmohankumar-vv/",
    };
  } else if (["github"].some((word) => cleanedMsg.includes(word))) {
    reply = { type: "link", message: "https://github.com/vvmohan97" };
  }

  // --- FALLBACK ---
  else {
    reply = {
      type: "text",
      message:
        "🤔 I didn’t fully get that… try asking something like 'hi', 'contact', 'joke' 😃\n  💡 Powered with ❤️ by Mohan ",
    };
  }

  socket.emit("botReply", reply);
});

  
  // socket.on("userMessage", (msg) => {
  //   console.log(socket.id, msg, "qwerty");

  //   // if (!msg || typeof msg !== "string") return;
  //   const cleanedMsg = msg.trim().toLowerCase();
  //   let reply = {
  //     type: "text",
  //     message: "I'm still learning—could you explain that a bit differently?",
  //   };

  //   if (
  //     cleanedMsg.includes("hi") ||
  //     cleanedMsg.includes("hello") ||
  //     cleanedMsg.includes("welcome")
  //   ) {
  //     reply = {
  //       type: "text",
  //       message:
  //         "👋 Hey there! I'm Mohan, your AI buddy. What can I do for you today?",
  //     };
  //   } else if (cleanedMsg.includes("contact")) {
  //     reply = {
  //       type: "text",
  //       message: "vvmohan.vsr@gmail.com \n  Ph:+91-9524244117",
  //     };
  //   } else if (cleanedMsg.includes("email")) {
  //     reply = { type: "text", message: "vvmohan.vsr@gmail.com" };
  //   } else if (
  //     cleanedMsg.includes("number") ||
  //     cleanedMsg.includes("mobile") ||
  //     cleanedMsg.includes("phone")
  //   ) {
  //     reply = { type: "text", message: "📞 +91-9524244117" };
  //   } else if (cleanedMsg.includes("instagram")) {
  //     reply = {
  //       type: "link",
  //       message:
  //         "https://www.instagram.com/call_me_v.v.mohan?igsh=MTBudm5sYjZ4Ym1taA==",
  //     };
  //   } 
  //   else if (cleanedMsg.includes("qr")) {
  //     reply = { type: "linkqr", message: "Linked" };
  //   } else if (cleanedMsg.includes("linkedin")) {
  //     reply = {
  //       type: "link",
  //       message: "https://www.linkedin.com/in/vvmohankumar-vv/",
  //     };
  //   } else if (cleanedMsg.includes("github")) {
  //     reply = { type: "link", message: "https://github.com/vvmohan97" };
  //   }

  //   socket.emit("botReply", reply);
  //   console.log("Bot Reply:", reply);
  // });

  socket.on("disconnect", () => {
    console.log("❌ Socket disconnected");
  });

  socket.on("error", (err) => {
    console.log("⚠️ Socket Error:", err);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

import { GoogleGenAI } from "@google/genai";
import type { Content } from "@/types";
const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

type TextResponse =
  | {
      res: string;
      err: null;
    }
  | {
      res: null;
      err: string;
    };

export const generateTextResponse = async (
  prompt: string,
  chatHistory: Content[] = []
): Promise<TextResponse> => {
  const textConfig = { responseMimeType: "text/plain" };
  const textModel = "gemini-2.0-flash";

  // Start with the chat history
  const contents: Content[] = [...chatHistory];

  // Add the current user prompt
  contents.push({
    role: "user",
    parts: [
      {
        text: prompt,
      },
    ],
  });

  try {
    const response = await ai.models.generateContentStream({
      model: textModel,
      config: textConfig,
      contents: contents,
    });

    let fullResponse = "";
    for await (const chunk of response) {
      try {
        fullResponse += chunk.text ?? "";
      } catch (error) {
        console.error("Error processing stream chunk:", error);
        return {
          res: null,
          err: "Error processing stream chunk.",
        };
      }
    }

    return {
      res: fullResponse,
      err: null,
    };
  } catch (error: unknown) {
    console.error("Error generating text response from Gemini API:", error);

    const errorMessage =
      "An unknown error occurred while communicating with the Gemini API.";

    return {
      res: null,
      err: errorMessage,
    };
  }
};

// Example Usage (assuming you are in a .ts file within a project that supports ESM and top-level await):
//
// // Define a sample chat history (make sure it conforms to the Content type)
// const sampleHistory: Content[] = [
//   { role: "user", parts: [{ text: "Hello, I'm working on a project." }] },
//   { role: "model", parts: [{ text: "Great! What kind of project is it?" }] },
// ];
//
// const userPrompt = "Can you give me some ideas for a JavaScript project?";
//
// async function main() {
//   const result = await generateTextResponse(userPrompt, sampleHistory);
//
//   if (result.success) {
//     console.log("AI Said:", result.response);
//     // Add the AI's response to the history for the next turn
//     // sampleHistory.push({ role: "user", parts: [{ text: userPrompt }] });
//     // sampleHistory.push({ role: "model", parts: [{ text: result.response! }] });
//   } else {
//     console.error("Failed to get response from AI:", result.error);
//     if (result.error && result.error.details && result.error.details.message) {
//       // More specific error from the API
//       console.error("API Error Message:", result.error.details.message);
//     }
//   }
// }
//
// main();

//
// async function main() {
//   const ai = new GoogleGenAI({
//     apiKey: process.env.GEMINI_API_KEY,
//   });
//   // File_2
//   // Ensure that the file is available in local system working directory or change the file path.
//   const files = [
//     await ai.files.upload({ file: "f-1.jpg" }),
//     await ai.files.upload({ file: "Spring+Boot+eCommerce+Masterclass.pdf" }),
//   ];
//   const config = {
//     responseMimeType: "text/plain",
//   };
//   const model = "gemini-2.0-flash";
//   const contents = [
//     {
//       role: "user",
//       parts: [
//         {
//           text: `could you give me an example code of react?`,
//         },
//       ],
//     },
//     {
//       role: "model",
//       parts: [
//         {
//           text: `\`\`\`jsx
// import React, { useState } from 'react';

// function Counter() {
//   // Declare a state variable called "count" and initialize it to 0
//   const [count, setCount] = useState(0);

//   // Function to increment the count
//   const increment = () => {
//     setCount(count + 1);
//   };

//   // Function to decrement the count
//   const decrement = () => {
//     setCount(count - 1);
//   };

//   return (
//     <div>
//       <h1>Counter</h1>
//       <p>Count: {count}</p>
//       <button onClick={increment}>Increment</button>
//       <button onClick={decrement}>Decrement</button>
//     </div>
//   );
// }

// export default Counter;
// \`\`\`

// **Explanation:**

// * **\`import React, { useState } from 'react';\`**: This line imports the React library and the \`useState\` hook.  \`useState\` is a function that allows you to add React state to function components.

// * **\`function Counter() { ... }\`**: This defines a functional component named \`Counter\`. Functional components are the most common way to write React components.

// * **\`const [count, setCount] = useState(0);\`**: This is the core of the state management.
//     * \`useState(0)\` initializes the state variable \`count\` to 0.
//     * It returns an array with two elements:
//         * \`count\`:  The current value of the state variable.
//         * \`setCount\`: A function that allows you to update the state variable.  **Crucially, you should always use \`setCount\` to update the state, not directly modify \`count\`.**

// * **\`const increment = () => { setCount(count + 1); };\`**: This defines a function called \`increment\`.  When called, it uses \`setCount\` to update the \`count\` state variable by adding 1 to its current value.

// * **\`const decrement = () => { setCount(count - 1); };\`**:  Similar to \`increment\`, this function decrements the \`count\` state variable by 1.

// * **\`return ( ... );\`**: This is the JSX (JavaScript XML) that defines what the component renders to the screen.
//     * \`<h1>Counter</h1>\`:  A heading that displays the title "Counter".
//     * \`<p>Count: {count}</p>\`:  A paragraph that displays the current value of the \`count\` state variable. Notice how we use curly braces \`{}\` to embed JavaScript expressions (in this case, the \`count\` variable) within the JSX.
//     * \`<button onClick={increment}>Increment</button>\`:  A button that, when clicked, calls the \`increment\` function.
//     * \`<button onClick={decrement}>Decrement</button>\`:  A button that, when clicked, calls the \`decrement\` function.

// * **\`export default Counter;\`**: This line exports the \`Counter\` component, making it available for use in other parts of your application.

// **How to use this component:**

// 1.  **Save the code:**  Save this code in a file named \`Counter.js\` (or any name you prefer, but be consistent with the \`export default\` name).

// 2.  **Import it into your main component (e.g., \`App.js\`):**

//     \`\`\`jsx
//     import React from 'react';
//     import Counter from './Counter'; // Adjust the path if necessary

//     function App() {
//       return (
//         <div>
//           <h1>My App</h1>
//           <Counter /> {/*  Use the Counter component here */}
//         </div>
//       );
//     }

//     export default App;
//     \`\`\`

// 3.  **Run your React application:**  Make sure you have a React development environment set up (e.g., using \`create-react-app\`).  Start the development server (usually with \`npm start\` or \`yarn start\`).

// Now, when you run your React application, you will see the \`Counter\` component displayed on the page. Clicking the "Increment" and "Decrement" buttons will update the count value.

// **Key takeaways:**

// * **State:**  \`useState\` is fundamental for managing data that changes over time in a React component.
// * **JSX:**  JSX is a syntax extension to JavaScript that allows you to write HTML-like structures within your JavaScript code.
// * **Components:** React applications are built from reusable components.
// * **Event Handling:**  The \`onClick\` attribute on the buttons demonstrates how to handle user events in React.

// This is a basic example, but it illustrates the core concepts of React development.  As you learn more, you'll explore more advanced topics like props, conditional rendering, lists, forms, and effects.
// `,
//         },
//       ],
//     },
//     {
//       role: "user",
//       parts: [
//         {
//           text: `how are you?
// `,
//         },
//       ],
//     },
//     {
//       role: "model",
//       parts: [
//         {
//           text: `I am doing well, thank you for asking! As a large language model, I don't experience feelings or physical sensations like humans do, but I am functioning optimally and ready to assist you. How can I help you today?
// `,
//         },
//       ],
//     },
//     {
//       role: "user",
//       parts: [
//         {
//           text: `what date is today
// `,
//         },
//       ],
//     },
//     {
//       role: "model",
//       parts: [
//         {
//           text: `Today is October 27, 2023.
// `,
//         },
//       ],
//     },
//     {
//       role: "user",
//       parts: [
//         {
//           text: `could you give me an image of the cat?`,
//         },
//       ],
//     },
//     {
//       role: "model",
//       parts: [
//         {
//           text: `I am able to interact with images (e.g. describing or analysing them), but I am unable to generate or edit pixel-based images myself. This capability is only enabled for the "Gemini 2.0 Flash Experimental" model when the selected output format is "Images and text".

// However, I *can* provide you with a text-based response! How about this:

// \`\`\`ascii
//  /\\_/\\
// ( o.o )
//  > ^ <
// \`\`\`

// Alternatively, I can provide you with an AI prompt that you can use in an image generation tool like Stable Diffusion or Midjourney to create an image of a cat:

// \`\`\`
// A cute, fluffy cat sitting on a windowsill, bathed in warm sunlight.  Its eyes are bright and curious.  Photorealistic, 8k resolution.
// \`\`\`

// Which option would you prefer, or perhaps you have something else in mind?
// `,
//         },
//       ],
//     },
//     {
//       role: "user",
//       parts: [
//         {
//           fileData: {
//             fileUri: files[0].uri,
//             mimeType: files[0].mimeType,
//           },
//         },
//         {
//           text: `could you describe items in this image?`,
//         },
//       ],
//     },
//     {
//       role: "model",
//       parts: [
//         {
//           text: `Okay, I can describe the items in the image. Here's what I see:

// *   **A Blue Truck:** The most prominent element is a blue, vintage-looking truck. It appears to be a classic pickup, possibly from the 1970s or 80s. It has chrome accents and details. Critically, the truck is positioned vertically, with one end submerged in water.

// *   **Water:** The truck appears to be partially submerged in a large body of water, likely a lake. The water is relatively calm, creating a reflection of the truck.

// *   **Reflection:** A clear reflection of the truck is visible in the water, creating a surreal and symmetrical effect.

// *   **Background Landscape:** In the background, there is a shoreline with trees and hills. The landscape appears somewhat arid, with dry vegetation. The sky is clear and pale blue.

// *   **Wheels and Tires:** The tires are visible, and appear to be in good condition. The rims are chrome.

// In summary, the image presents a somewhat surreal scene of a vintage truck seemingly standing upright in a lake, with its reflection creating a striking visual. The background provides a natural, somewhat dry, landscape context.
// `,
//         },
//       ],
//     },
//     {
//       role: "user",
//       parts: [
//         {
//           fileData: {
//             fileUri: files[1].uri,
//             mimeType: files[1].mimeType,
//           },
//         },
//         {
//           text: `what is this pdf about`,
//         },
//       ],
//     },
//     {
//       role: "model",
//       parts: [
//         {
//           text: `This PDF appears to be a presentation or course material for a "Spring Boot eCommerce Masterclass" by Faisal Memon (EmbarkX).

// Here's a breakdown of the topics covered, based on the OCR'd text:

// *   **Fundamentals:**
//     *   How the web works (Client/Server model, HTTP vs HTTPS).
//     *   APIs (REST APIs, API Request Types, REST principles).
//     *   Databases (Relational/Non-Relational), DBMS, SQL, ORM, JPA.

// *   **Core Spring Concepts:**
//     *   Spring Framework introduction and history.
//     *   Inversion of Control (IoC), Dependency Injection (DI), and Beans.
//     *   Spring Container and Configuration.
//     *   Tight and Loose Coupling.

// *   **Spring Boot:**
//     *   Introduction to Spring Boot (Why Spring Boot, components, advantages).

// *   **Data Layer & Modeling:**
//     *   Data Access Layer.
//     *   Entities and Relationships (One-to-One, One-to-Many, Many-to-Many, Unidirectional/Bidirectional).
//     *   Cascading and FetchTypes.

// *   **Security:**
//     *   Introduction to Spring Security.
//     *   Authentication and Authorization (JWT).
//     *   Hashing (bcrypt).

// *   **Implementation & Design:**
//     *   DTO Pattern
//     *   Managing Addresses.
//     *   Shopping Cart Implementation.
//     *   Validations in Spring Boot.
//     *   Custom Exceptions in Spring Boot

// *   **Deployment:**

// The presentation is very detailed and intended to give a complete overview about how to use Spring Boot for E-Commerce, it's architecture, security etc.

// In summary, this PDF provides a comprehensive overview of the technologies and design principles involved in building an e-commerce application using Spring Boot.`,
//         },
//       ],
//     },
//     {
//       role: "user",
//       parts: [
//         {
//           text: `INSERT_INPUT_HERE`,
//         },
//       ],
//     },
//   ];

//   const response = await ai.models.generateContentStream({
//     model,
//     config,
//     contents,
//   });

//   for await (const chunk of response) {
//     console.log(chunk.text);
//   }
// }

// main();

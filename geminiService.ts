
import { GoogleGenAI, Type } from "@google/genai";
import { PartnerConfig } from "../types";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateLovePoem = async (config: PartnerConfig) => {
  const ai = getAI();
  
  const contents: any[] = [
    {
      text: `כתוב שיר אהבה מטלטל ויוקרתי בעברית עבור סינדי ווינשטיין (הכינוי שלה: ${config.nickname}).
      השתמש במידע הבא כדי ליצור שיר אישי בצורה מטורפת:
      - בתמונה שלנו: היא מרכיבה משקפיים עגולים עדינים ומחייכת חיוך רך.
      - היא לובשת קפוצ'ון שחור בולט עם הכיתוב "Ninety One" באותיות ורודות גדולות.
      - אני (הבחור) עם זקן, לובש ז'קט שחור, והראשים שלנו צמודים באהבה בתוך חשיכה עמוקה.
      - הקשר שלנו נמשך כבר ${config.relationshipLength}.
      - זיכרון ליבה: ${config.specialMemory}.
      
      השיר צריך להתייחס לפרטים האלו (המשקפיים, הכיתוב הוורוד על הקפוצ'ון השחור, הקרבה הפיזית בחושך) כסמלים לקשר שלנו.
      הסגנון: מודרני, פואטי, עמוק, בסגנון "אפל" - מינימליסטי אך עוצמתי רגשית. אל תשתמש במילים נדושות. תכתוב כמו משורר שרואה את הנשמה שלהם דרך התמונה הזו.`
    }
  ];

  if (config.couplePhotoBase64) {
    contents.push({
      inlineData: {
        mimeType: 'image/jpeg',
        data: config.couplePhotoBase64.split(',')[1]
      }
    });
  }

  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: { parts: contents },
    config: {
      temperature: 0.95,
      topP: 0.9,
      thinkingConfig: { thinkingBudget: 12000 } // Maximum reasoning for deep emotional impact
    }
  });

  return response.text;
};

export const generateLoveImage = async (config: PartnerConfig) => {
  const ai = getAI();
  const prompt = `A hyper-realistic 3D digital sculpture of two souls merging, made of iridescent liquid glass and pink neon light (inspired by the text on her hoodie). 
  Background is absolute pitch black. Soft focus, cinematic lighting, 8K resolution. 
  The aesthetic should feel like an Apple hardware launch trailer but for human emotions.`;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: { parts: [{ text: prompt }] },
    config: {
      imageConfig: {
        aspectRatio: "16:9"
      }
    }
  });

  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  return null;
};

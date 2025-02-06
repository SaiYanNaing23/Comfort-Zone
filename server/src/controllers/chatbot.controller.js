import { Mistral } from '@mistralai/mistralai';

export const chatBotCallBack = async (req, res, next) => {
    const { content } = req.body
    
    try {
        const apiKey = process.env.MISTRAL_API_KEY;
        const client = new Mistral({apiKey: apiKey});

        const chatResponse = await client.chat.complete({
        model: 'mistral-large-latest',
        messages: [{role: 'user', content}],
        });

        const result = chatResponse.choices[0].message.content
        res.status(200).json({ result });
    } catch (error) {
        console.log("Error in chatBotCallBack", error);
        next(error);
    }
}
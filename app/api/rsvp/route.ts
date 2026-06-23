import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, status, guestCount, cardId } = body;

        const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
        const telegramChatId = process.env.TELEGRAM_CHAT_ID;

        // Nếu chưa cài đặt biến môi trường, vẫn trả về success để UI không báo lỗi đỏ, 
        // nhưng ngầm hiểu là chưa gửi được thông báo.
        if (!telegramBotToken || !telegramChatId) {
            return NextResponse.json(
                { success: true, message: 'Chưa cấu hình Telegram Bot' },
                { status: 200 }
            );
        }

        const statusText = status === 'yes' ? '✅ Sẽ tham dự' : '❌ Không thể tham dự';
        const countText = status === 'yes' ? `\n👥 Số lượng khách: <b>${guestCount}</b>` : '';

        const message = `
💌 <b>CÓ KHÁCH XÁC NHẬN THAM DỰ</b> 💌
        
👤 Khách mời: <b>${name}</b>
📌 Trạng thái: ${statusText}${countText}
🔗 Từ thiệp: ${cardId}
`;

        const response = await fetch(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: telegramChatId,
                text: message,
                parse_mode: 'HTML',
            }),
        });

        if (!response.ok) {
            throw new Error('Lỗi gửi tin nhắn Telegram');
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('RSVP Error:', error);
        return NextResponse.json(
            { success: false, message: 'Đã có lỗi xảy ra' },
            { status: 500 }
        );
    }
}

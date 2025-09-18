//
//
//export const commonAction = (text,chat_name,data,isfirst,socket) =>{
//    const firstconnection = {
//        type: "chat_begin",
//        message: text,
//        chat_name: chat_name,
//        user: data.display_name,
//    };
//    const input = {
//    type: "chat_message",
//    message: text,
//    chat_id: data.chat_id,
//    };
//    isfirst
//    ? socket.send(JSON.stringify(firstconnection))
//    : socket.send(JSON.stringify(input));
//}
//
//
//
//// commonAction



export const commonAction = (text, chat_name, data, isfirst, socket) => {
  const firstconnection = {
    type: "chat_begin",
    message: text,
    chat_name: chat_name,
    user: data.display_name,
  };

  const input = {
    type: "chat_message",
    message: text,
    chat_id: data.chat_id,
  };

  const payload = isfirst ? firstconnection : input;

  // ✅ WebSocket state tekshiramiz
  if (socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(payload));
  } else if (socket.readyState === WebSocket.CONNECTING) {
    console.warn("⏳ WebSocket hali ochilmagan. Kutib yuboriladi...");
    socket.onopen = () => {
      socket.send(JSON.stringify(payload));
      console.log("✅ WebSocket ochildi va xabar yuborildi:", payload);
    };
  } else {
    console.error("❌ WebSocket yopilgan. Qayta ulanish kerak!");
  }
};

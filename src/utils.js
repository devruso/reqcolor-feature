import moment from "moment";

const calculateElapsedTime = (startDate) => {
    const start = moment(startDate);
    const end = moment(new Date());
    const diffInMinutes = end.diff(start, 'minutes');
    return diffInMinutes;
  };

  export async function updateBackgroundColor(props,taskCreator, setBackgroundColor){
    const conversationSid = props.task.attributes.conversationSid;
    const conversation = await props.manager.conversationsClient.getConversationBySid(conversationSid);
    const messages = await conversation.getMessages();
    const lastMessage = messages.items[messages.items.length - 1];
    const lastMessageTime = new Date(lastMessage.timestamp);
    const elapsedTime = calculateElapsedTime(lastMessageTime);

      if (props.manager.user.identity === lastMessage.author || taskCreator != 'customer') {
        setBackgroundColor("#e1e3ea");
      } else {
        if (elapsedTime >= 8) {
          setBackgroundColor("#ee7f83"); 
        } else if (elapsedTime >= 4) {
          setBackgroundColor("#def733");
        } else {
          setBackgroundColor("#0efc6e");
        }
      }
  };



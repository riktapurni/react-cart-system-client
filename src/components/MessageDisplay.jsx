import useProduct from "../hooks/useProduct";

const MessageDisplay = () => {
  const { message } = useProduct();

  if (!message) return null;

  return (
    <div className={`fixed top-50 left-80 z-50 p-10 rounded-md shadow-lg ${
      message.type === 'success' 
        ? 'bg-green-100 text-green-800 border border-green-200' 
        : 'bg-red-100 text-red-800 border border-red-200'
    }`}>
      {message.text}
    </div>
  );
};
export default MessageDisplay
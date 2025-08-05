import { useSelector } from "react-redux";

function Message({ children }) {
  const wishlist = useSelector((state) => state.wishlist.wishlistIds);

  if (wishlist.length === 0) {
    return (
      <div className="text-center text-[#3E445A] mt-10 text-3xl">
        {children}
      </div>
    );
  }
  return null;
}

export default Message;

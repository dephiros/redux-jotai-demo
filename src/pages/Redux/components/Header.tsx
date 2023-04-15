import { connect } from "react-redux";
import { tw } from "twind";
import { getUserAvatar, getCurrentUserName } from "../selectors/user";
import FlashyBox from "../../../components/FlashyBox";

function Header({ avatar, name }) {
  return (
    <FlashyBox className={tw`flex flex-col text-center text-xl`}>
      <img class={tw`block mx-auto w-[100px]`} src={avatar} alt={name} />
      <p>{name}</p>
    </FlashyBox>
  );
}

function mapStateToProps(state) {
  return { avatar: getUserAvatar(state), name: getCurrentUserName(state) };
}

export default connect(mapStateToProps, {})(Header);

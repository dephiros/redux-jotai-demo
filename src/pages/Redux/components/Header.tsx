import { connect } from "react-redux";
import { tw } from "twind";
import { getUserAvatar, getCurrentUserName } from "../selectors/user";
import { StoreState } from "../store";
import FlashyBox from "../../../components/FlashyBox";

export interface Props {
  avatar: string;
  name: string;
}

function Header({ avatar, name }: Props) {
  return (
    <FlashyBox className={tw`flex flex-col text-center text-xl`}>
      <img className={tw`block mx-auto w-[100px]`} src={avatar} alt={name} />
      <p>{name}</p>
    </FlashyBox>
  );
}

function mapStateToProps(state: StoreState) {
  return { avatar: getUserAvatar(state), name: getCurrentUserName(state) };
}

export default connect(mapStateToProps, {})(Header);

import { connect } from 'react-redux';
import { tw } from 'twind';
import { getUserAvatar, getCurrentUserName } from '../selectors/User';

function Header({ avatar, name }) {
  return (
    <div class={tw`flex flex-col text-center text-xl`}>
      <img class={tw`block mx-auto w-[100px]`} src={avatar} alt={name} />
      <p>{name}</p>
    </div>
  );
}

function mapStateToProps(state) {
  return { avatar: getUserAvatar(state), name: getCurrentUserName(state) };
}

export default connect(mapStateToProps, {})(Header);

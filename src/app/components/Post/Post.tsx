import { IPost } from '../Main/Main';
import s from './Post.module.scss';
interface IPostProps {
  post: IPost;
  addFilter: (filterArg: string) => void;
}

const Post = ({ post, addFilter }: IPostProps) => {
  function clickRole() {
    addFilter(post.role);
  }

  function clickTool(indexTool: number) {
    addFilter(post.tools[indexTool]);
  }

  function clickLang(indexLang: number) {
    addFilter(post.languages[indexLang]);
  }

  function clickLevel() {
    addFilter(post.level);
  }

  return (
    <div className={s.post}>
      <div className={s.logo}>
        <img src={post.logo} alt={post.company} />
      </div>
      <div className={s.postWithoutLogo}>
        <div className={s.job}>
          <div className={s.cardHeader}>
            {post.company}
            {post.new && <div className={s.new}>NEW!</div>}
            {post.featured && <div className={s.featured}>FEATURED</div>}
          </div>
          <div className={s.position}>{post.position}</div>
          <div className={s.cardFooter}>
            <div className={s.footerItem}>{post.postedAt}</div>
            <div className={s.point}></div>
            <div className={s.footerItem}>{post.contract}</div>
            <div className={s.point}></div>
            <div className={s.footerItem}>{post.location}</div>
          </div>
        </div>
        <div className={s.line}></div>
        <div className={s.tags}>
          <div className={s.tag} onClick={clickRole}>
            {post.role}
          </div>
          <div className={s.tag} onClick={clickLevel}>
            {post.level}
          </div>
          {post.languages.map((lang, index) => (
            <div
              className={s.tag}
              key={'lang' + index}
              onClick={() => {
                clickLang(index);
              }}>
              {lang}
            </div>
          ))}
          {post.tools.map((tool, index) => (
            <div
              className={s.tag}
              key={'tool' + index}
              onClick={() => {
                clickTool(index);
              }}>
              {tool}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Post;

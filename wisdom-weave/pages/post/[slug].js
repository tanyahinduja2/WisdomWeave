import ArticleMain from "../../components/ArticleMain";
import ReadersNav from "../../components/ReadersNav";
import Recommendations from "../../components/Recommendations";
import { useContext, useEffect, useState } from "react";
import { WisdomWeaveContext } from "../../context/WisdomWeaveContext";
import { useRouter } from "next/router";

const styles = {
    content: "flex"
}

const Post = () => {
    const { posts, users } = useContext(WisdomWeaveContext)
    const router = useRouter()
    const [post, setPost] = useState([])
    const [author, setAuthor] = useState([])

    useEffect(() => {
        if (posts.length === 0) {
            return
        }

        const selectedPost = posts.find(post => post.id === router.query.slug)

        if (selectedPost) {
            setPost(selectedPost)
            setAuthor(users.find(user => user.id === selectedPost.data.authorEmail))
        } else {
            console.log("Selected post not found:", router.query.slug);
        }
    }, [posts, router.query.slug, users]);

    const filteredPosts = posts.filter(p => p.id !== post.id);

    return (
        <div className={styles.content}>
            <ReadersNav />
            <ArticleMain post={post} author={author}/>
            <Recommendations author={author} filteredPosts={filteredPosts} post={post} />
        </div>
    )
}

export default Post;

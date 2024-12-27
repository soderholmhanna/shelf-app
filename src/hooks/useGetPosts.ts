import { where } from "firebase/firestore";
import { postsCol } from "../services/firebase";
import useStreamCollection from "./useStreamCollection";

const useGetPosts = (uids: string[]) => {
    const { data: posts, loading: postsLoading } = useStreamCollection(
        postsCol,
        ...(uids?.length ? [where("userId", "in", uids)] : [])
    );

    return { posts, postsLoading };
};

export default useGetPosts;

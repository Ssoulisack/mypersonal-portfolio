type BucketListRequest = {
    title: string
    status?: boolean
}
type BucketListResponse = {
    id: string;
    title: string;
    status?: boolean;
};

export default BucketListResponse;
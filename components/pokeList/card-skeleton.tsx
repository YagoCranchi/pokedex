import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function CardSkeleton() {
    return (
        <div className="h-full sm:max-w-[250px] max-w-full w-full px-4 py-2 type-bg bg-hover rounded-md">
            <div className="font-bold text-lg w-full text-center sm:mb-0 mb-3">
                <Skeleton width={150} />
            </div>
            <div className="flex">
                <div className="w-2/3 h-[362px] sm:h-[145px]">
                    <Skeleton borderRadius={8} height="80%" width="80%" />
                </div>
                <div className="w-1/3 flex flex-col gap-2 mt-3">
                    <div className="flex flex-col gap-3 w-[140px] sm:w-[75px]">
                        <Skeleton borderRadius={50} width="100%" height={30} />
                        <Skeleton borderRadius={50} width="100%" height={30} />
                    </div>
                </div>
            </div>
        </div>
    );
}
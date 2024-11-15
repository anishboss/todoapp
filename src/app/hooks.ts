import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store";

export const userAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

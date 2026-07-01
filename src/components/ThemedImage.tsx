import React from "react";
import { useTheme } from "@mui/material/styles";

interface ThemedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    src: string;
    srcDark?: string;
}

const ThemedImage: React.FC<ThemedImageProps> = ({
    src,
    srcDark,
    alt = "",
    ...rest
}) => {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === "dark";

    const finalSrc = isDarkMode && srcDark ? srcDark : src;

    return <img src={finalSrc} alt={alt} {...rest} />;
};

export default ThemedImage;

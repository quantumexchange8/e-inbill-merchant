import { Player } from '@lottiefiles/react-lottie-player';
import loadingAnimate from "@/Components/loading/loading.json"

const TableLoadingTemplate = () => {

    return (
        <Player
            autoplay
            loop
            src={loadingAnimate} // Pass the Lottie JSON file
            style={{ height: '300px', width: '300px' }} // Set dimensions
        />
    )
}

export {TableLoadingTemplate} ;
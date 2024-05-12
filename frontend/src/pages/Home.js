import PicOfTheDay from "../components/PicOfTheDay"
import DONKIForm from "../components/DONKI"
import EpicSlider from "../components/EpicImage"
import RoverDetails from "../components/Rover"
import AppAppBar from "../components/AppBar"
import Hero from "../components/Email"
import useEmail from "../hooks/fetchEmail"

const Home = () =>{

    const emailStorage = useEmail();

    return(
        <div>
        <AppAppBar email={emailStorage.get}/>
        <PicOfTheDay/>
        <DONKIForm/>
        <EpicSlider/>
        <RoverDetails/>

        </div>
    )


}

export default Home
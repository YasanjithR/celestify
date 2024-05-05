import PicOfTheDay from "../components/PicOfTheDay"
import DONKIForm from "../components/DONKI"
import EpicSlider from "../components/EpicImage"
import RoverDetails from "../components/Rover"
import AppAppBar from "../components/AppBar"
import Hero from "../components/Email"

const Home = () =>{

    return(
        <div>
        <AppAppBar/>
        <PicOfTheDay/>
        <DONKIForm/>
        <EpicSlider/>
        <RoverDetails/>
        <Hero/>
        </div>
    )


}

export default Home
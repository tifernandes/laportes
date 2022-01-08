import { Carousel } from 'antd';
import styles from '../styles/Slide.module.css'
import Image from 'next/image'

const Slide = () => {

  const props = {
    dots: true,
    infinite: true,
    speed: 1500,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <Carousel autoplay {...props} className={styles.slide}>
        <img src="/slide1.jpg" />
        <img src="/slide2.jpg" />
        <img src="/slide3.jpg" />
        <img src="/slide4.jpg" />
        <img src="/slide6.jpg" />
        <img src="/slide7.jpg" />
        <img src="/slide8.jpg" />
        <img src="/slide9.jpg" />
        <img src="/slide10.jpg" />
        <img src="/slide11.jpg" />
        <img src="/slide12.jpg" />
        <img src="/slide13.jpg" />
        <img src="/slide14.jpg" />
        <img src="/slide15.jpg" />
    </Carousel>
  );
}
 
export default Slide;
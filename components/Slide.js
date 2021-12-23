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
    </Carousel>
  );
}
 
export default Slide;
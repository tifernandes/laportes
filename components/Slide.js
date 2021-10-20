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
        <Image src="/know-our-menu.png" width={516} height={387} />
        <Image src="/laportes_santoAndre.jpg" width={516} height={387} />
    </Carousel>
  );
}
 
export default Slide;
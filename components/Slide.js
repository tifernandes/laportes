import { Carousel } from 'antd';
import styles from '../styles/Slide.module.css'

const Slide = () => {

  const props = {
    dots: true,
    infinite: true,
    speed: 3000,
    autoplaySpeed: 6000,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <Carousel autoplay {...props}>
      <div className={styles.slide}>
        <div className={styles.slide1} />
      </div>
      <div className={styles.slide}>
        <div className={styles.slide2} />
      </div>
    </Carousel>
  );
}
 
export default Slide;
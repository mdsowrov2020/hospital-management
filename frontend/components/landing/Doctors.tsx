import React, { useEffect, useState } from "react";
import styles from "./Doctors.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import Image from "next/image";
import { Typography } from "antd";
import { getDoctors } from "@/lib/api/doctors/service";

const { Title, Paragraph } = Typography;

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const data = await getDoctors();
        setDoctors(data || []);
      } catch (err) {
        console.error("Failed to fetch doctors:", err);
      }
    };
    fetchDoctors();
  }, []);

  const getImageByGender = (gender: string) => {
    return gender?.toLowerCase() === "female"
      ? "/images/woman.png"
      : "/images/man.png";
  };

  return (
    <section className={styles.container}>
      <div className={styles.heading}>
        <Paragraph className={styles.littleHeading} style={{ margin: 0 }}>
          DOCTORS
        </Paragraph>
        <Title style={{ margin: 0 }}>Our Outstanding Doctors</Title>
      </div>

      <Swiper
        modules={[Autoplay]}
        spaceBetween={20}
        slidesPerView={3}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
      >
        {doctors.map((doc) => (
          <SwiperSlide key={doc.id}>
            <div className={styles.card}>
              <Image
                className={styles.image}
                src={getImageByGender(doc.gender)}
                width={120}
                height={120}
                alt={doc.fullName}
              />
              <div className={styles.textCenter}>
                <div className={styles.name}>{doc.fullName}</div>
                <div className={styles.specialization}>
                  {doc.specialization}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Doctors;

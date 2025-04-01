import styles from "./page.module.css";
import CalendarComponent from "@/components/Calendar";

export default function Home() {
  return (
    <div className={styles.page}>
      <h1>Home</h1>
      <CalendarComponent />
    </div>
  );
}

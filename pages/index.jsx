import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";
import rock from "../public/img/rock.png";
import paper from "../public/img/paper.png";
import scissors from "../public/img/scissors.png";
import loading from "../public/img/loading.gif";

export default function Home() {
  const [selected, setSelected] = useState("Pick");
  const [cpuSelected, setCpuSelected] = useState("Pick");
  const [randNum, setRandNum] = useState(0);
  const cpu = ["Rock", "Paper", "Scissors"];
  const [ready, setReady] = useState(false);
  const [showResult, setShowResult] = useState(false);

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  function MyButton(props) {
    return (
      <button
        type="button"
        onClick={() => clicked(props.selected)}
        className={`lg:p-6 sm:p-2 mx-2 basis-1/3 bg-white border border-gray-200 rounded-lg shadow focus:outline-none dark:bg-gray-800 dark:border-gray-700 ${
          props.ready == false ? "" : "hover:bg-gray-100 dark:hover:bg-gray-700"
        } `}
        disabled={props.ready == false ? true : false}
      >
        <h5 className="mb-2 lg:text-2xl sm:text-sm font-bold tracking-tight text-gray-900 dark:text-white">
          {props.name}
        </h5>
        <Image
          src={props.img}
          className="lg:w-20 sm:w-10 mx-auto transform -scale-x-100"
          alt="imgBtn"
        ></Image>
      </button>
    );
  }

  const [load, setLoad] = useState(false);

  function clicked(name) {
    setLoad(true);

    setTimeout(function () {
      setLoad(false);
      setSelected(name);
      let rand = getRandomInt(3);
      if (rand != randNum) {
        setRandNum(rand);
        setCpuSelected(cpu[rand]);
      } else {
        setRandNum(getRandomInt(3));
        setCpuSelected(cpu[getRandomInt(3)]);
      }
      setShowResult(true);
    }, 3500);
  }

  function renderImg(selected, flip) {
    if (selected == "Rock")
      return (
        <Image
          src={rock}
          className={`w-40 mx-auto ${flip ? "transform -scale-x-100" : ""}`}
          alt="rock"
        ></Image>
      );
    if (selected == "Paper")
      return (
        <Image
          src={paper}
          className={`w-40 mx-auto ${flip ? "transform -scale-x-100" : ""}`}
          alt="paper"
        ></Image>
      );
    if (selected == "Scissors")
      return (
        <Image
          src={scissors}
          className={`w-40 mx-auto ${flip ? "transform -scale-x-100" : ""}`}
          alt="scissors"
        ></Image>
      );
    else
      return (
        <Image
          src={loading}
          className="w-40 mx-auto"
          priority
          alt="loader"
        ></Image>
      );
  }

  function ifReady(ready) {
    if (ready == false) {
      return (
        <div
          type="button"
          className="mx-auto bg-red-600 py-2 pb-4 cursor-pointer hover:bg-red-500"
          onClick={() => {
            setReady(true);
          }}
        >
          <h1 className="text-center lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white">
            READY
          </h1>
        </div>
      );
    } else {
    }
  }

  function gameResult(person, cpu) {
    var winAudio = new Audio("/sounds/win.mp3");
    var looseAudio = new Audio("/sounds/loose.mp3");
    setTimeout(function () {
      if (person != cpu) {
        if (person == "Rock") {
          if (cpu == "Scissors") {
            winAudio.play();
            setTimeout(function () {
              alert("You Win !!");
            }, 500);
          }
          if (cpu == "Paper") {
            looseAudio.play();
            setTimeout(function () {
              alert("You Lost !!");
            }, 500);
          }
        }
        if (person == "Paper") {
          if (cpu == "Scissors") {
            looseAudio.play();
            setTimeout(function () {
              alert("You Lost !!");
            }, 500);
          }
          if (cpu == "Rock") {
            winAudio.play();
            setTimeout(function () {
              alert("You Win !!");
            }, 500);
          }
        }
        if (person == "Scissors") {
          if (cpu == "Paper") {
            winAudio.play();
            setTimeout(function () {
              alert("You Win !!");
            }, 500);
          }
          if (cpu == "Rock") {
            looseAudio.play();
            setTimeout(function () {
              alert("You Lost  !!");
            }, 500);
          }
        }
      } else {
        alert("Draw !!");
      }
    }, 1000);

    setShowResult(false);
  }

  function Arena(props) {
    if (load) {
      return (
        <div className="text-center flex justify-center basis-1/2 mx-auto animate-bounce">
          <div>
            <h1 className="text-center border border-green-400 text-green-400">
              You
            </h1>
            {renderImg("Rock", true)}
          </div>
          <h1 className="text-2xl font-bold flex items-center">VS</h1>
          <div>
            <h1 className="text-center border border-red-600 text-red-600">
              CPU
            </h1>
            {renderImg("Rock", false)}
          </div>
        </div>
      );
    } else {
      return (
        <div className="text-center flex justify-center basis-1/2 mx-auto">
          <div className="mx-auto">
            <h1 className="text-center border border-green-400 text-green-400">
              You
            </h1>
            {renderImg(props.selected, true)}
          </div>
          <h1 className="text-2xl font-bold flex items-center">VS</h1>
          <div className="mx-auto">
            <h1 className="text-center border border-red-600 text-red-600">
              CPU
            </h1>
            {renderImg(props.cpuSelected, false)}
          </div>
        </div>
      );
    }
  }

  return (
    <>
      <Head>
        <title>Rock Paper Scissors</title>
      </Head>
      {showResult == true ? gameResult(selected, cpuSelected) : ""}
      {console.log(showResult)}
      <main
        className="bg-black text-white "
        style={{
          width: "100%",
          height: "100vh",
        }}
      >
        <div className="mx-auto bg-yellow-400 py-2 pb-4">
          <h1 className="text-center lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white">
            {ready == true ? "ROCK PAPER SCISSORS" : "CLICK READY TO PLAY"}
          </h1>
        </div>
        <div className="flex row my-10">
          <Arena selected={selected} cpuSelected={cpuSelected} load={load} />
        </div>

        <div className="flex flex-row my-5">
          <MyButton selected={"Rock"} img={rock} name="ROCK" ready={ready} />

          <MyButton selected={"Paper"} img={paper} name="PAPER" ready={ready} />

          <MyButton
            selected={"Scissors"}
            img={scissors}
            name="SCISSORS"
            ready={ready}
          />
        </div>

        {ifReady(ready)}
        <footer className="p-4 rounded-lg shadow md:px-6 md:py-8">
          <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
            ©{" "}
            <a href="" className="hover:underline">
              RenzyCode
            </a>
            . All Rights Reserved.
          </span>
        </footer>
      </main>
    </>
  );
}

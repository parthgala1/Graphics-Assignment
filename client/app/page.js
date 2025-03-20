"use client";

import {
  background,
  blower_body,
  blower_handle,
  blower_nozzle,
  A,
  B,
  C,
  D,
  E,
  F,
  G,
  H,
  I,
  J,
  K,
  L,
  M,
  N,
  O,
  P,
  Q,
  R,
  S,
  T,
  U,
  V,
  W,
  X,
  Y,
  Z,
  baloon_green,
  baloon_blue,
  baloon_yellow,
  baloon_purple,
  baloon_red,
  baloon_orange,
  baloon_pink,
  baloon_darkblue,
  baloon_darkyellow,
  string,
} from "@/public/graphics";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Graphic = () => {
  const [body, setBody] = useState(false);
  const [count, setCount] = useState(0);
  const [selectBaloon, setSelectBaloon] = useState(baloon_blue);
  const [selectLetter, setSelectLetter] = useState(A);
  const [letter, setLetter] = useState(0);
  const [state, setState] = useState("idle"); // idle, blowing, flying, done
  const [balloonSize, setBalloonSize] = useState(1.6);
  const maxSize = 1.2;
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [direction, setDirection] = useState({ x: 1, y: 1 });
  const [velocity, setVelocity] = useState({ x: 3, y: 2 });
  const [isPopping, setIsPopping] = useState(false);

  const selectedBaloon = () => {
    const baloons = [
      baloon_green,
      baloon_blue,
      baloon_yellow,
      baloon_purple,
      baloon_red,
      baloon_orange,
      baloon_pink,
      baloon_darkblue,
      baloon_darkyellow,
    ];
    const random = Math.floor(Math.random() * baloons.length);
    return baloons[random];
  };

  const selectedLetter = (num) => {
    const letters = [
      A,
      B,
      C,
      D,
      E,
      F,
      G,
      H,
      I,
      J,
      K,
      L,
      M,
      N,
      O,
      P,
      Q,
      R,
      S,
      T,
      U,
      V,
      W,
      X,
      Y,
      Z,
    ];
    return letters[num];
  };

  const handleBlower = () => {
    setBody(true);
    setCount(count + 1);

    if (count == 0) {
      setState("blowing");
      setSelectBaloon(selectedBaloon());
      setSelectLetter(selectedLetter(letter));
    }

    if (count >= 4) {
      setState("flying");
      setCount(0);
      if (letter >= 25) setLetter(0);
      else setLetter(letter + 1);
      setBalloonSize(maxSize + 1.0);
      setVelocity({ x: 3, y: 2 });
    } else {
      const newSize = 1.0 + (count * (maxSize + 1.0)) / 4;
      setBalloonSize(newSize);
    }

    setTimeout(() => {
      setBody(false);
    }, 200);
  };

  useEffect(() => {
    if (state === "flying") {
      const flyInterval = setInterval(() => {
        setPosition((prev) => {
          const windowWidth = 1900;
          const windowHeight = 1285;
          const balloonWidth = 100;
          const balloonHeight = 100;

          let newX = prev.x + velocity.x * direction.x;
          let newY = prev.y + velocity.y * direction.y;

          // Bounce off right/left walls
          if (newX > windowWidth - balloonWidth - 16 || newX < 16) {
            setDirection((d) => ({ ...d, x: -d.x }));
            newX = newX < 16 ? 16 : windowWidth - balloonWidth - 16;
          }

          // Bounce off top/bottom walls
          if (newY > windowHeight - balloonHeight - 16 || newY < 16) {
            setDirection((d) => ({ ...d, y: -d.y }));
            newY = newY < 16 ? 16 : windowHeight - balloonHeight - 16;
          }

          return {
            x: newX,
            y: newY,
          };
        });
      }, 16);

      const flyingTimeout = setTimeout(() => {
        clearInterval(flyInterval);
        setState("done");
        setPosition({ x: 0, y: 0 });
        setDirection({ x: 1, y: 1 });
      }, 15000);

      return () => {
        clearInterval(flyInterval);
        clearTimeout(flyingTimeout);
      };
    }
  }, [state, direction, velocity]);

  const handlePop = () => {
    if (state === "flying") {
      setIsPopping(true);
      const lastPosition = position; // Store the last known position
      setPosition(lastPosition);
      setTimeout(() => {
        setIsPopping(false);
      }, 1000);
      setState("done");
    }
  };

  useEffect(() => {
    if (state === "done") {
      // Reset the balloon to the last known position when done
      setPosition((prev) => prev);
    }
  }, [state]);

  return (
    <div className="h-screen w-screen bg-cover bg-center border-black border-8">
      <Image
        src={background}
        alt="background"
        layout="fill"
        className="h-screen w-screen relative -z-100"
      />
      <div onClick={handleBlower} className="">
        <Image
          src={blower_body}
          alt="blower"
          className={`absolute z-10 transition-all duration-200 ${
            body ? "h-56 w-72 right-6" : "h-64 w-64 right-10"
          } bottom-10`}
        />
        <Image
          src={blower_handle}
          alt="blower"
          className={`absolute h-60 w-60 transition-all duration-200 ${
            body ? "bottom-22" : "bottom-48"
          }  right-12`}
        />
        <Image
          src={blower_nozzle}
          alt="blower"
          className="absolute h-60 w-60 bottom-20 right-48"
        />
      </div>
      <div className="cursor-pointer" onClick={() => handlePop()}>
        <Image
          src={selectBaloon}
          alt="baloon"
          id="balloon"
          className={`absolute z-10 transition-all
          ${isPopping ? "duration-0 scale-150 opacity-0" : "duration-1000"} 
          ${(state === "idle" || state == "done") && "h-0 w-0"}
          ${(state === "blowing" || state === "flying") && "h-20 w-20"} 
          right-82 bottom-66`}
          style={{
            transform: `scale(${
              isPopping ? 0 : state === "flying" ? maxSize + 1.0 : balloonSize
            })
            translateY(${state === "flying" ? -position.y * 10 : -count * 6}px)
            translateX(${state === "flying" ? -position.x * 5 : 0}px)`,
          }}
        />
        <Image
          src={selectLetter}
          alt="letter"
          className={`absolute z-10 transition-all
          ${isPopping ? "duration-0 scale-150 opacity-0" : "duration-1000"} 
          ${(state === "idle" || state == "done") && "h-0 w-0"}
          ${(state === "blowing" || state === "flying") && "h-10 w-10"}
          right-87 bottom-74`}
          style={{
            transform: `scale(${
              state === "flying" ? maxSize + 1.0 : balloonSize
            })
                translateY(-${
                  state === "flying" ? position.y * 10 : count * 6
                }px)
                translateX(-${state === "flying" ? position.x * 5 : 0}px)
          `,
          }}
        />
        <Image
          src={string}
          alt="string"
          className={`absolute z-10 transition-all
          ${isPopping ? "duration-0 scale-150 opacity-0" : "duration-1000"} 
          ${
            (state === "idle" || state == "done" || state == "blowing") &&
            "h-0 w-0"
          }
          ${state === "flying" && "h-20 w-20"}
          right-80 bottom-36`}
          style={{
            transform: `scale(${
              state === "flying" ? maxSize + 1.0 : balloonSize
            })
                translateY(-${
                  state === "flying" ? position.y * 10 : count * 6
                }px)
                translateX(-${state === "flying" ? position.x * 5 : 0}px)
          `,
          }}
        />
      </div>
      {isPopping && (
        <div
          className="z-10 text-4xl text-yellow-600 absolute"
          style={{
            left: `${position.x + 100}px`,
            top: `${position.y - 30}px `,
          }}
        >
          Pop!
        </div>
      )}
    </div>
  );
};

export default Graphic;

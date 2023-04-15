export const expToRank = (exp) => {
  if(exp < 1){
    return 0;
  }else if (exp < 30){
    return 1;
  }else if (exp < 100){
    return 2;
  }else if (exp < 200){
    return 3;
  }else if (exp < 350){
    return 4;
  }else if (exp < 550){
    return 5;
  }else if (exp < 850){
    return 6;
  }else if (exp < 1300){
    return 7;
  }else if (exp < 2000){
    return 8;
  }else if (exp < 3000){
    return 9;
  }else if (exp < 5000){
    return 10;
  }else{
    return 11
  }
};

export const expToClass= (exp) => {

  if(exp < 1){
    return "初級";
  }else if (exp < 30){
    return "10級";
  }else if (exp < 100){
    return "9級";
  }else if (exp < 200){
    return "8級";
  }else if (exp < 350){
    return "7級";
  }else if (exp < 550){
    return "6級";
  }else if (exp < 850){
    return "5級";
  }else if (exp < 1300){
    return "4級";
  }else if (exp < 2000){
    return "3級";
  }else if (exp < 3000){
    return "2級";
  }else if (exp < 5000){
    return "1級";
  }else{
    return "初段"
  }
};

export const rankToColor = (rank) => {

  if(rank === 0){
    return "#F5F5F5";
  }else if (rank === 1){
    return "#32cd32";
  }else if (rank === 2){
    return "#32cd32";
  }else if (rank === 3){
    return "#0073e6";
  }else if (rank === 4){
    return "#0073e6";
  }else if (rank === 5){
    return "#b31212";
  }else if (rank === 6){
    return "#b31212";
  }else if (rank === 7){
    return "#ad14cc";
  }else if (rank === 8){
    return "#ad14cc";
  }else if (rank === 9){
    return "#ffa500";
  }else if (rank === 10){
    return "ffa500";
  }else if (rank === 11){
    return "black"
  }
};
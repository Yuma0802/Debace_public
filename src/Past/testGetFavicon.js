import React from "react";

const testGetFavicon = () => {

  return(
    <>
   <form>
      <label>
        Url:
        <input type="text" name="url" />
      </label>
      <input type="submit" value="Submit" />
    </form>

    <img src="http://www.google.com/s2/favicons?domain=https://cpoint-lab.co.jp/article/202108/20806/" ></img>
    </>
  );
};

export default testGetFavicon;
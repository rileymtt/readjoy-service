const isYoutubeLink: {
  regex: RegExp;
  check: (str: string) => boolean;
  replace: (str: string) => string;
} = {
  regex:
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?(?:\S*?&)?v=|embed\/|v\/)|youtu\.be\/)([\w\-]{11})(\S*)/g,
  check: (str: string) => isYoutubeLink.regex.test(str),
  replace: (str: string) => {
    var replacement =
      '<iframe width="560" height="315" src="https://www.youtube.com/embed/$1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
    var result = str.replace(isYoutubeLink.regex, replacement);
    return result;
  },
};

const isTwitterLink: {
  regex: RegExp;
  check: (str: string) => boolean;
  replace: (str: string) => string;
} = {
  regex:
    /(?:https?:\/\/)?(?:www\.)?twitter\.com\/(?:#!\/)?(\w+)\/status(?:es)?\/(\d+)(\S*)/g,
  check: (str: string) => isTwitterLink.regex.test(str),
  replace: (str: string) => {
    var replacedString = str.replace(
      isTwitterLink.regex,
      function (match, username, statusId) {
        var embedCode =
          '<blockquote class="twitter-tweet"><a href="https://twitter.com/' +
          username +
          "/status/" +
          statusId +
          '"></a></blockquote>';
        return embedCode;
      }
    );
    return replacedString;
  },
};

const isXLink: {
  regex: RegExp;
  check: (str: string) => boolean;
  replace: (str: string) => string;
} = {
  regex:
    /(?:https?:\/\/)?(?:www\.)?x\.com\/(?:#!\/)?(\w+)\/status(?:es)?\/(\d+)(\S*)/g,
  check: (str: string) => isXLink.regex.test(str),
  replace: (str: string) => {
    var replacedString = str.replace(
      isXLink.regex,
      function (match, username, statusId) {
        var embedCode =
          '<blockquote class="twitter-tweet"><a href="https://twitter.com/' +
          username +
          "/status/" +
          statusId +
          '"></a></blockquote>';
        return embedCode;
      }
    );
    return replacedString;
  },
};

const isImageLink: {
  regex: RegExp;
  check: (str: string) => boolean;
  replace: (str: string) => string;
} = {
  regex: /(https?:\/\/[^\s]+?\.(jpg|jpeg|png|gif|bmp|svg|webp))(?:\?[^\s]+)?/gi,
  check: (str: string) => isImageLink.regex.test(str),
  replace: (str: string) => {
    var replacedString = str.replace(isImageLink.regex, function (match) {
      var embedCode = `<img src="${match}" />`;
      return embedCode;
    });
    return replacedString;
  },
};

const isVideoLink: {
  regex: RegExp;
  check: (str: string) => boolean;
  replace: (str: string) => string;
} = {
  regex: /(https?:\/\/[^\s]+?\.(mp4|mkv|avi|mov|wmv))(?:\?[^\s]+)?/gi,
  check: (str: string) => isVideoLink.regex.test(str),
  replace: (str: string) => {
    var replacedString = str.replace(isVideoLink.regex, function (match) {
      var embedCode = `<video src="${match}" autoplay muted controls/>`;
      return embedCode;
    });
    return replacedString;
  },
};

const isPinterestLink: {
  regex: RegExp;
  check: (str: string) => boolean;
  replace: (str: string) => string;
} = {
  regex: /(https?:\/\/(?:www\.)?pinterest\.com\/pin\/(\d+))(\S*)/gi,
  check: (str: string) => isPinterestLink.regex.test(str),
  replace: (str: string) => {
    const result = str.replace(
      isPinterestLink.regex,
      (match, pinUrl, pinId) => {
        return `
          <iframe 
            src="https://assets.pinterest.com/ext/embed.html?id=${pinId}" 
            height="695" 
            width="450" 
            frameborder="0"
            scrolling="no"
          ></iframe>`;
      }
    );
    return result;
  },
};

const isLink: {
  regex: RegExp;
  check: (str: string) => boolean;
  replace: (str: string) => string;
} = {
  // regex:
  //   /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi,
  regex:
    /(?<!href=["'])\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|](?![^<]*>)/gi,

  check: (str: string) => {
    return isLink.regex.test(str);
  },
  replace: (str: string) => {
    const result = str.replace(isLink.regex, function (url) {
      return '<a href="' + url + '" target="_blank">' + url + "</a>";
    });
    return result;
  },
};

function embedLink(str: string) {
  if (isYoutubeLink.check(str)) {
    return isYoutubeLink.replace(str);
  } else if (isTwitterLink.check(str)) {
    return isTwitterLink.replace(str);
  } else if (isXLink.check(str)) {
    return isXLink.replace(str);
  } else if (isPinterestLink.check(str)) {
    return isPinterestLink.replace(str);
  } else if (isImageLink.check(str)) {
    return isImageLink.replace(str);
  } else if (isVideoLink.check(str)) {
    return isVideoLink.replace(str);
  } else if (isLink.check(str)) {
    return isLink.replace(str);
  } else {
    return str;
  }
}

export function generateDisplayContent(str: string) {
  const arr = str.split("\n");
  const temp = [];

  for (let iterator of arr) {
    //? check is not html html
    iterator = iterator.trim();
    if (!iterator.includes("src")) {
      const replacedText = embedLink(iterator);
      temp.push(`<p>${replacedText}</p>`);
    } else {
      temp.push(iterator);
    }
  }

  const result = temp.join("\n");
  return result;
}

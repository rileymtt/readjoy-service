import moment from "moment";

export function hideEmail(email: string) {
  const lft = email.split("@")[0].slice(0, 4);
  return lft + "•••";
}

export function hideWallet(text: string, length: number = 8) {
  if (text) {
    if (text.length > 15) {
      return `${text.substring(0, length)}•••${text.substring(
        text.length - length,
        text.length
      )}`;
    }
    return text;
  }
  return "";
}

export const formatDisplayname = (params: {
  walletAddress: string;
  username: string;
  email: string;
  firstname: string;
  lastname: string;
}): string => {
  if (params.firstname || params.lastname) {
    return params.firstname;
    // return (params.firstname || "") + " " + (params.lastname || "");
  }
  if (params.username) {
    return params.username;
  }
  if (params.walletAddress) {
    return params.walletAddress;
  }
  return hideEmail(params.email);
};

export const formatHiddenName = (params: {
  walletAddress: string;
  username: string;
  email: string;
  firstname: string;
  lastname: string;
}) => {
  if (params.firstname || params.lastname) {
    return params.firstname;
    // return (params.firstname || "") + " " + (params.lastname || "");
  }
  if (params.username) {
    return params.username;
  }
  if (params.walletAddress) {
    return hideWallet(params.walletAddress, 4);
  }
  return hideEmail(params.email);
};

export function fixedShortContent(text: string, length: number = 40) {
  text = removeHtmlTags(text);
  text = text.replace(/\n/g, "");
  const beforeText = text.substring(0, length);
  if (text.length > length) {
    return `${beforeText}`;
  }
  return text;
}

export function removeHtmlTags(str: string) {
  return str.replace(/<[^>]*>/g, "");
}

export function beautyNumber(num: any, digits: number) {
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value;
    });
  return item
    ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol
    : "0";
}

export function formatTime(time: any) {
  return moment(time).format("YYYY-MM-DD HH:mm:ss");
}

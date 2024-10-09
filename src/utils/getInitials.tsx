
export const getInitials = (name?: string, displayName?: string) => {
    const effectiveName = name || displayName;
    if (!effectiveName) return "";
    const nameArray = effectiveName.split(" ");
    const initials = nameArray.map((n) => n.charAt(0).toUpperCase()).join("");
    return initials;
  };
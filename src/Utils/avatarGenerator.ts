

export default function avatarGenerator (name?: string) {
    //todo: implement random text generator
    return `https://api.multiavatar.com/${name || 'random'}.png`;
}
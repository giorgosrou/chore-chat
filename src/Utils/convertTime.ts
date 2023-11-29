import moment from "moment";

export default function convertTime(date:string) {
    moment(date).format('llll');
}
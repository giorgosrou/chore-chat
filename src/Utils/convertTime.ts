import moment from "moment";

export default function convertTime(date:string):string | undefined {
    return moment(date).format('llll');
}
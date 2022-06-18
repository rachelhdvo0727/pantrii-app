export default class Campaign {
    constructor(
        public _id: string,
        public title: string,
        public imageSrc: string,
    ) {
        this._id = _id;
        this.title = title;
        this.imageSrc = imageSrc;
    }
}

type Tags = [];

export default class Product {
    constructor(
        public _id: string,
        public productTitle: string,
        public producerTitle: string,
        public producerId: Object,
        public imageSrc: string,
        public productDesc: string,
        public amountInStock: number,
        public bulkPrice: string,
        public singlePrice: string,
        public expiryDuration: string,
        public productStory: string,
        public productUnique: string,
        public categoryId: Object,
        public dateTime: Date,
        public isFeatured: boolean,
        public tags: Tags[],
        public productUnit: string,
    ) {
        this._id = _id;
        this.productTitle = productTitle;
        this.producerTitle = producerTitle;
        this.producerId = producerId;
        this.imageSrc = imageSrc;
        this.productDesc = productDesc;
        this.amountInStock = amountInStock;
        this.bulkPrice = bulkPrice;
        this.singlePrice = singlePrice;
        this.expiryDuration = expiryDuration;
        this.productStory = productStory;
        this.productUnique = productUnique;
        this.categoryId = categoryId;
        this.dateTime = dateTime;
        this.isFeatured = isFeatured;
        this.tags = tags;
        this.productUnit = productUnit;
    }
}

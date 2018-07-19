import './style/footer.less';

export default {
    data() {
        return {
            author: 'yzj'
        };
    },
    created() {
        console.log(1);
    },
    mounted() {
        console.log(2);
    },
    render() {
        return (
            <div id="footer">
                <span>footer banner by {this.author}</span>
            </div>
        );
    }
};

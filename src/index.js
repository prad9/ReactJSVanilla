import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from "youtube-api-search";
import _ from "lodash";
import SearchBar from './components/search_bar';
import VideoList from "./components/video_list";
import VideoDetail from "./components/video_detail";

const API_KEY = "AIzaSyAfWCFk82qFWFA-y11-FKXltB1avcFisyg";

class App extends Component{
    constructor(props) {
        super(props);

        this.state = {
            videos: [],
            selectedVideo: null
        };

        this.videoSearch("Orchard CMS");
    }

    videoSearch(term) {
        YTSearch({key: API_KEY, term: term}, (data) => {
            this.setState({
                videos: data,
                selectedVideo: data[0]
            });
        });
    }

    render() {
        const videoSearch = _.debounce((term) => { this.videoSearch(term)}, 300);

        return (
            <div>
                <SearchBar onSearchTermChange={videoSearch}/>
                <VideoList
                    onVideoSelect={selectedVideo => this.setState({selectedVideo})}
                    videos={this.state.videos} />
                <VideoDetail video={this.state.selectedVideo} />
            </div>
        );
    }
}

ReactDOM.render(<App></App>, document.querySelector(".container"));
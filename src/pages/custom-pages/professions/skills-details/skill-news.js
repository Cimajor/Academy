import React, { useContext, useEffect, useState } from "react";
import Content from "../../../../layout/content/Content";
import Head from "../../../../layout/head/Head";
import { Dropdown, Card, Loader } from "semantic-ui-react";
import { _GetListOfReditNews } from "../../../../utils/Api";
import { BlockBetween, BlockDes, BlockHead, BlockHeadContent, Block } from "../../../../components/Component";
import "./skill-details.scss";

import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
// import { UserContext } from "./UserContext";

const SkillNews = ({ skillTitle }) => {
  const [data, setData] = useState([]);
  const { id } = useParams();

  const [onSearch, setonSearch] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(10);
  const [relatedNews, setRelatedNews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // function to toggle the search option
  const toggle = () => setonSearch(!onSearch);

  // Get current list, pagination
  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    getListOfNews();
  }, []);

  const getListOfNews = () => {
    setIsLoading(true);
    _GetListOfReditNews(`${skillTitle} news`, 10)
      .then((res) => {
        setRelatedNews(res.data.data.children);
        console.log(res.data.data.children);
      })
      .finally(() => setIsLoading(false));
  };

  // Change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const { errors, register, handleSubmit } = useForm();

  return (
    <React.Fragment>
      <Head title="User List - Regular"></Head>
      {isLoading ? (
        <div className="loaderSreen">
          <div className="page-loading">
            <Loader active size="large">
              <p>Loading...</p>
            </Loader>
          </div>
        </div>
      ) : (
        <Content>
          <BlockHead size="sm">
            <BlockBetween>
              <BlockHeadContent>
                <BlockDes className="text-soft">
                  <p>{skillTitle} news</p>
                </BlockDes>
              </BlockHeadContent>
            </BlockBetween>
          </BlockHead>
          <Block>
            <div className="news-board">
              {relatedNews
                ? relatedNews.map((post) => {
                    console.log(post.data);
                    return (
                      <Card
                        href={post.data.url}
                        header={post.data.title}
                        description={post.data.selftext.substring(0, 100)}
                        meta={skillTitle}
                      />
                    );
                  })
                : ""}
            </div>
          </Block>
        </Content>
      )}
    </React.Fragment>
  );
};
export default SkillNews;

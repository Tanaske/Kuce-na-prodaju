import { BlockRenderer } from "components/BlockRenderer";
import { MainMenu } from "components/MainMenu";
import { PageWrapper } from "context/page";


export const Page = (props) => 
{
  console.log("PAGE PROPS:",props);
    return (
    <PageWrapper value={{title: props.title,featuredImage: props.featuredImage}}>
    <MainMenu 
    items={props.mainMenuItems} 
    callToActionLabel={props.callToActionLabel} 
    callToActionDestination={props.callToActionDestination}
    />
    <BlockRenderer blocks = {props.blocks} />
  </PageWrapper>
    );
}
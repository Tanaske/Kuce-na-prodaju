import { CallToActionButton } from "components/CallToActionButton/CallToActionButton";
import { Column } from "components/Column/Column";
import { Columns } from "components/Columns/Columns";
import { Cover } from "components/Cover";
import { Heading } from "components/Heading";
import { Paragraph } from "components/Paragraph";
import { PostTitle } from "components/PostTitle";
import { PropertySearch } from "components/PropertySearch";
import Image from "next/image";
import { theme } from "theme";

export const BlockRenderer = ({blocks}) => 
{
    return blocks.map(block => 
        {
        switch(block.name) 
        {

            case 'acf/propertysearch':{
                return <PropertySearch key={block.id}/>
            }

            
            case 'core/post-title':{
                return <PostTitle key={block.id} level={block.attributes.level} textAlign={block.attributes.textAlign} />
            }




            case 'core/column':
            {
                return <Column key={block.id} width={block.attributes.width}>

                    <BlockRenderer blocks={block.innerBlocks} />


                </Column>
            }

            case 'core/columns': 
            {
                return <Columns 
                key={block.id} 
                isStackedOnMobile ={block.attributes.isStackedOnMobile} 
                >
                    <BlockRenderer blocks={block.innerBlocks} />

                </Columns>
            }

            case 'acf/ctabutton': 
            {
                console.log("CTA" , block);
                 return <CallToActionButton 
                 key={block.id} 
                 buttonLabel={block.attributes.data.label} 
                 destination={block.attributes.data.destination || "/" } 
                 align ={block.attributes.data.align}
                 
                 />
            

            }

            case 'core/paragraph' : 
            {
                return <Paragraph key={block.id} 
                content={block.attributes.content}
                textAlign={block.attributes.align}
                textColor={
                    theme[block.attributes.textColor] || 
                    block.attributes.style?.color?.text
                }
                />
            }

            case 'core/heading' : 
            {
               return <Heading key={block.id} 
               textAlign={block.attributes.textAlign} 
               level={block.attributes.level} 
               content={block.attributes.content}
               />
            }

            case 'core/cover': 
            {
                console.log("COVER BLOCK:",block);
                return <Cover key={block.id} background = {block.attributes.url} >
                        <BlockRenderer blocks={block.innerBlocks} />
                     </Cover>
            }

            case 'core/image':{
                return (
                    <Image 
                    key={block.id} 
                    src={block.attributes.url} 
                    height={block.attributes.originalHeight} 
                    width={block.attributes.originalWidth} 
                    alt={block.attributes.alt || ""}
                    />
                );
            }

            case 'core/block':
            case 'core/group':{
                return <BlockRenderer key={block.id} blocks={block.innerBlocks}/>
            }

            default: {
               console.log("UNKNOWN:" , block);
               return null;
            }
              
        }
        });
};




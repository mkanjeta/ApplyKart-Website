import { useEffect } from 'react';


const TableOfContents = () => {
  useEffect(() => {
    // Function to generate Table of Contents
    const generateTableOfContents = () => {
      const tocContainer = document.querySelector('.toc-container');
      if (!tocContainer) return;

      let tocContent = '<p class="toc-heading">Table of Contents</p><ul>';

      // Get all H2 tags in the post content
      const h2Tags = document.querySelectorAll('.blogcontent h2');

      if (h2Tags.length === 0) {
        tocContent += '<li>No headings found</li>';
      } else {
        h2Tags.forEach((h2Tag, index) => {
          const headingText = h2Tag.textContent;
          const anchorId = 'toc-anchor-' + index;
          h2Tag.setAttribute('id', anchorId);

          tocContent += `<li><a href="#${anchorId}">${index + 1}) ${headingText}</a></li>`;
        });
      }

      tocContent += '</ul>';
      tocContainer.innerHTML = tocContent;

      // Smooth scroll to the section when clicking on a TOC link
      tocContainer.addEventListener('click', (event) => {
        event.preventDefault();
        if (event.target.tagName === 'A') {
          const targetId = event.target.getAttribute('href').substring(1);
          const targetElement = document.getElementById(targetId);

          if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
          }
        }
      });
    };

    // Call the function to generate Table of Contents
    generateTableOfContents();
  }, []); // Empty dependency array ensures this runs once after component mounts

  return <div className="toc-container"></div>;
};

export default TableOfContents;
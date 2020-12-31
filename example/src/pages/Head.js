import React from 'react';

import {Hero, Heading, Section ,Container} from 'react-bulma-components';

function Head () {
    return (
        <Section>
          <Hero color="primary" >
            <Hero.Body>
              <Container>
                <Heading>
                  Example D3.Deployment
                </Heading>
                {/* <Heading subtitle size={3}> */}
                {/* </Heading> */}
              </Container>
            </Hero.Body>
          </Hero>
        </Section>
    );
}

export default Head;

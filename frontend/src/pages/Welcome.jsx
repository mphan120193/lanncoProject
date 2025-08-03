
import React from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Welcome.css';




const WelcomeScreen = () => {
    const navigate = useNavigate();
    

    

    return (
        <div className="welcome-screen-wrapper d-flex align-items-center justify-content-center py-5">
            <Container className="welcome-container">
                <Card className="welcome-card shadow-lg border-0 rounded-4">
                    <Card.Body className="p-5 text-center">
                        
                        

                        <h1 className="welcome-title mb-3">Welcome to Lannco</h1>
                        

                        <div className="d-grid gap-3 col-md-8 mx-auto">
                            <Button
                                variant="primary"
                                size="lg"
                                className="welcome-button"
                                onClick={() => { navigate('/login'); }}
                            >
                                Sign In to Your Account
                            </Button>

                            <Button
                                variant="outline-secondary"
                                size="lg"
                                className="welcome-button"
                                onClick={() => { navigate('/register'); }}
                            >
                                Register Now
                            </Button>
                            
                        </div>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
};

export default WelcomeScreen;
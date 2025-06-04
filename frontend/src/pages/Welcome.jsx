
import React from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Welcome.css';
import logoImage from '/Logo.png';



const WelcomeScreen = () => {
    const navigate = useNavigate();
    

    

    return (
        <div className="welcome-screen-wrapper d-flex align-items-center justify-content-center py-5">
            <Container className="welcome-container">
                <Card className="welcome-card shadow-lg border-0 rounded-4">
                    <Card.Body className="p-5 text-center">
                        
                        <img
                            src={logoImage} 
                            alt="Sunshine Dental Care Logo"
                            className="mb-4 welcome-logo"
                            style={{ maxWidth: '320px', height: 'auto' }} 
                        />

                        <h1 className="welcome-title mb-3">Welcome to Sunshine Dental Care</h1>
                        <p className="welcome-subtitle text-muted mb-5">
                            Your brighter smile starts here. Experience gentle, comprehensive dental care.
                        </p>

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
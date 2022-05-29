import React from 'react';
import generalStyles from '../styles/General';
// Components
import { StyleSheet, StyleProp, ViewStyle, Text, View } from 'react-native';
import IconButton from './actions/IconButton';

export interface SectionInInformationCardProps {
    sectionTitle: string;
    sectionStyle?: StyleProp<ViewStyle>;
    sectionContent?:
        | React.Component
        | React.ReactNode
        | React.ReactChildren
        | React.ReactChild;
    isTopSection?: boolean;
    isLastSection?: boolean;
    isEditable?: boolean;
    onEdit?: React.ComponentProps<typeof IconButton>['onPress'];
}

const SectionInInformationCard = ({
    sectionTitle,
    sectionStyle,
    sectionContent,
    isTopSection,
    isLastSection,
    isEditable,
    onEdit,
}: SectionInInformationCardProps) => {
    return (
        <View
            style={[
                styles.sectionContainer,
                isTopSection && styles.topSectionSpacing,
                isLastSection && styles.lastSection,
                isEditable && styles.flexWithButton,
                sectionStyle,
            ]}
        >
            <Text style={styles.sectionHeader}>{sectionTitle}</Text>
            <View style={styles.contentContainer}>{sectionContent}</View>
            {isEditable ? (
                <IconButton
                    arrowRight
                    title="Redigér"
                    onPress={onEdit}
                    isActive={isEditable}
                ></IconButton>
            ) : null}
        </View>
    );
};

export default SectionInInformationCard;

const styles = StyleSheet.create({
    sectionContainer: {
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(189, 189, 189, 0.5)',
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    sectionHeader: {
        ...generalStyles.headerH3,
        marginBottom: 5,
        marginTop: 3,
    },
    topSectionSpacing: { marginTop: 10 },
    contentContainer: {},
    lastSection: {
        borderBottomWidth: 0,
        marginBottom: 10,
    },
    flexWithButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});
